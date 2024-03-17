import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDishComponent } from './box-dish.component';

describe('BoxDishComponent', () => {
  let component: BoxDishComponent;
  let fixture: ComponentFixture<BoxDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
