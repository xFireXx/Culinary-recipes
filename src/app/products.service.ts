import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private filteredProductsSource = new BehaviorSubject<any[]>([]);
  filteredProducts$ = this.filteredProductsSource.asObservable();

  constructor() {}

  updateFilteredProducts(products: any[]) {
    this.filteredProductsSource.next(products);
  }
}
