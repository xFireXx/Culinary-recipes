import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BoxDishComponent } from '../home/box-dish/box-dish.component';


interface Product {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  calories: number;
  image: string | File;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private router: Router) {}

  @ViewChild('fileUploadText') fileUploadText: ElementRef | undefined;

  product = {
    id: '', 
    name: '',
    category: '',
    ingredients: [] as string[],
    calories: null as number | null,
    image: null as File | string | null,
  };

  ngOnInit() {
    document.body.style.backgroundColor = '#39DB4A';
  }

  private generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  addIngredient(ingredient: string) {
    if (ingredient) {
      this.product.ingredients.push(ingredient);
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.product.image = e.target?.result as string;
          if (this.fileUploadText) {
            this.fileUploadText.nativeElement.value = file.name;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  

  submit() {
    const errorMessageElement = document.getElementById('error');
    if (!this.product.name || !this.product.category || this.product.ingredients.length === 0 || this.product.calories === null) {
      if (errorMessageElement) {
        errorMessageElement.textContent = 'Uzupełnij wszystkie pola formularza.';
      }
      return;
    }

    this.product.id = this.generateId();  // Assign an ID here

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(this.product);
    localStorage.setItem('products', JSON.stringify(products));
    
    this.resetProduct();

    const successMessageElement = document.getElementById('success');
    if (successMessageElement) {
      successMessageElement.innerHTML = `<p>Udało się dodać produkt!</p>
      <button id="navigateButton">Przejdź na listę produktów</button>`;
      if (errorMessageElement) {
        errorMessageElement.textContent = '';
      }
      this.setupNavigation();
    }
  }

  private resetProduct() {
    this.product = {
      id: '',
      name: '',
      category: '',
      ingredients: [] as string[],
      calories: null,
      image: null,
    };
  }

  private setupNavigation() {
    const btn = document.getElementById('navigateButton');
    if (btn) {
      btn.addEventListener('click', () => {
        this.router.navigate(['/home']);
      });
    }
  }
}
