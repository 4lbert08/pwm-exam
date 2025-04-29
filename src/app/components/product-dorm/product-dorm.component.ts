import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-crud/product.service';

@Component({
  selector: 'app-product-dorm',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-dorm.component.html',
  styleUrl: './product-dorm.component.css'
})
export class ProductDormComponent {
  productService= inject(ProductService);

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });

  async onSubmit() {
    await this.productService.addProduct(this.form.value);
    this.form.reset();
  }
}
