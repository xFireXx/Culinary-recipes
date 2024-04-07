import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-dish',
  templateUrl: './box-dish.component.html',
  styleUrl: './box-dish.component.css'
})
export class BoxDishComponent {
  private _image: string | File | undefined;

  imageUrl: string | undefined;

  @Input() name: string | undefined;
  @Input() category: string | undefined;

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

}
