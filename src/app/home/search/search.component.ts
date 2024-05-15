import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  color: string = '#000';

  changeColor(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    selectElement.style.color = '#000';
  }

  @Output() searchEvent = new EventEmitter<{name?: string, category?: string, ingredient?: string, kcalMin?: number, kcalMax?: number}>();

  name: string = '';
  category: string = '';
  ingredient: string = '';
  kcalMin?: number;
  kcalMax?: number;

  emitSearch() {
    this.searchEvent.emit({
      name: this.name,
      category: this.category !== 'all' ? this.category : undefined,
      ingredient: this.ingredient,
      kcalMin: this.kcalMin,
      kcalMax: this.kcalMax
    });
  }
}
