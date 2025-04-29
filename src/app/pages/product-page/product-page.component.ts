import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {ProductDormComponent} from '../../components/product-dorm/product-dorm.component';
import {NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../../services/product-crud/product.service';
import {Product} from '../../models/product';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-page',
  imports: [
    HeaderComponent,
    ProductDormComponent,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  productService= inject(ProductService);
  products: Product[] = [];

  isEditing = false;
  partial: Partial<Product> = {};

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  changeModeToEdit(product: Product) {
    this.isEditing = true;
    this.partial = product;
  }

  changeModeToView() {
    this.isEditing = false;
    this.partial = {};
  }

  async deleteProduct(id: string | undefined) {
    if (id != null) {
      await this.productService.deleteProduct(id);
    }
  }

  async editProduct() {
    await this.productService.updateProduct(this.partial);
    this.changeModeToView();
  }
}
