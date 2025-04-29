import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDormComponent } from './product-dorm.component';

describe('ProductDormComponent', () => {
  let component: ProductDormComponent;
  let fixture: ComponentFixture<ProductDormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
