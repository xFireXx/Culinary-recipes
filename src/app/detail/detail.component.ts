import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  calories: number;
  image: string | File;
}

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product?: Product;  // Use optional, so it can be undefined if not found.

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.loadProductDetails(productId);
  }

  private loadProductDetails(productId: string | null) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.product = products.find((p: Product) => p.id === productId);
    if (!this.product) {
      console.error("Product not found!");
    } else {
      console.log("Loaded product:", this.product);
    }
  }
}
