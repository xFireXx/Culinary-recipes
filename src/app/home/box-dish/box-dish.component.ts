import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-dish',
  templateUrl: './box-dish.component.html',
  styleUrls: ['./box-dish.component.css']
})
export class BoxDishComponent {
  @Input() id: string | undefined; // Dodaj input dla ID
  @Input() name: string | undefined;
  @Input() category: string | undefined;
  private _image: string | File | undefined;
  imageUrl: string | undefined;

  constructor(private router: Router) {}

  @Input()
  set image(value: string | File | undefined) {
    this._image = value;
    if (value instanceof File) {
      this.imageUrl = URL.createObjectURL(value);
    } else {
      this.imageUrl = value;
    }
  }

  get image(): string | File | undefined {
    return this._image;
  }

  goToDetails() {
    if (this.id) {
      this.router.navigate(['/details', this.id]); // Użyj Router do nawigacji
      console.log(this.id)
    }
  }

  goToEdit() {
    if (this.id) {
      this.router.navigate(['/edit-product', this.id]); // Bezpośrednie przekazanie id do ścieżki
    }
  }
}
