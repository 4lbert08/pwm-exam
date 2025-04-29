import {Component, inject, OnInit} from '@angular/core';
import {ClientService} from '../../services/client-crud/client.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OrderService} from '../../services/order-crud/order.service';
import {ProductService} from '../../services/product-crud/product.service';
import {Client} from '../../models/client';
import {Product} from '../../models/product';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  clientService= inject(ClientService);
  productService= inject(ProductService);
  orderService= inject(OrderService);
  form: FormGroup = new FormGroup({
    clientId: new FormControl(),
    productId: new FormControl(),
    quantity: new FormControl(),
  });
  clients : Client[] = [];
  products : Product[] = [];

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  async onSubmit() {
    await this.orderService.addOrder(this.form.value);
    this.form.reset();
  }
}
