import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  ngOnInit() {
    document.body.style.backgroundColor = '#39DB4A';
  }

  constructor(private router: Router) {}

  @ViewChild('fileUploadText') fileUploadText: ElementRef | undefined;

  product = {
    name: '',
    category: '',
    ingredients: [] as string[],
    calories: null as number | null,
    image: null as File | string | null,
  };

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
    if (
      !this.product.name ||
      !this.product.category ||
      this.product.ingredients.length === 0 ||
      this.product.calories === null
    ) {
      if (errorMessageElement) {
        errorMessageElement.textContent =
          'Uzupełnij wszystkie pola formularza.';
      }
      return; 
    }

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(this.product);
    localStorage.setItem('products', JSON.stringify(products));
    console.log(products);


    this.product = {
      name: '',
      category: '',
      ingredients: [] as string[],
      calories: null,
      image: null,
    };

    const successMessageElement = document.getElementById('success');
    if (successMessageElement) {
      successMessageElement.innerHTML = `<p>Udało się dodać produkt!</p>
      <button id="navigateButton">Przejdź na listę produktów</button>`;
      if (errorMessageElement) {
        errorMessageElement.textContent = '';
      }
    }
    const btn = document.getElementById('navigateButton');
    if (btn) {
      btn.addEventListener('click', () => {
        this.router.navigate(['/home']);
      });
    }
  }
}
