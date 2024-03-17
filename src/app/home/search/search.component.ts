import { Component } from '@angular/core';

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
  
}
