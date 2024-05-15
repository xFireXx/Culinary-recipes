import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  calories: number;
  image: string | File;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  // ngOnInit() {
  //   document.body.style.backgroundColor = '#fff';

  //   this.products = JSON.parse(localStorage.getItem('products') || '[]').map((product: Product) => {
  //     if (product.image instanceof File) {
  //       return { ...product, image: URL.createObjectURL(product.image) };
  //     }
  //     return product;
  //   });
  // }

  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit() {
    document.body.style.backgroundColor = '#fff';
    this.loadProducts();
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]').map((product: Product) => {
      if (product.image instanceof File) {
        return { ...product, image: URL.createObjectURL(product.image) };
      }
      return product;
    });
    this.filteredProducts = this.products;
  }

  filterProducts(criteria: { name?: string, category?: string, ingredient?: string, kcalMin?: number, kcalMax?: number }) {
    this.filteredProducts = this.products.filter(product => {
      return (criteria.name ? product.name.toLowerCase().includes(criteria.name.toLowerCase()) : true) &&
             (criteria.category ? product.category === criteria.category : true) &&
             (criteria.ingredient ? product.ingredients.includes(criteria.ingredient) : true) &&
             (criteria.kcalMin ? product.calories >= criteria.kcalMin : true) &&
             (criteria.kcalMax ? product.calories <= criteria.kcalMax : true);
    });
  }

}
