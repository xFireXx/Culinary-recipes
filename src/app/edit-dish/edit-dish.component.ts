import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Product {
  id: string;
  name: string;
  category: string;
  calories: number;
  ingredients: string[];
  image: string;
}

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      calories: [0],
      ingredients: this.fb.array([]),
      image: ['']
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        calories: product.calories,
        image: product.image
      });
      this.setIngredients(product.ingredients);
    }
  }

  get ingredients(): FormArray {
    return this.productForm.get('ingredients') as FormArray;
  }

  setIngredients(ingredients: string[]): void {
    ingredients.forEach(ingredient => {
      this.ingredients.push(new FormControl(ingredient));
    });
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...this.productForm.value };
      localStorage.setItem('products', JSON.stringify(products));
      this.router.navigate(['/']);
    }
  }
}
