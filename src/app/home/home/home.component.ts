import { Component, OnInit } from '@angular/core';

interface Product {
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
  products: Product[] = [];
  
  ngOnInit() {
    document.body.style.backgroundColor = '#fff';

    this.products = JSON.parse(localStorage.getItem('products') || '[]').map((product: Product) => {
      if (product.image instanceof File) {
        return { ...product, image: URL.createObjectURL(product.image) };
      }
      return product;
    });
  }
}
