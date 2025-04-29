import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {OrderFormComponent} from '../../components/order-form/order-form.component';
import {NgForOf, NgIf} from '@angular/common';
import {ClientService} from '../../services/client-crud/client.service';
import {OrderService} from '../../services/order-crud/order.service';
import {ProductService} from '../../services/product-crud/product.service';
import {Client} from '../../models/client';
import {Product} from '../../models/product';
import {Order} from '../../models/orders';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-order-page',
  imports: [
    HeaderComponent,
    OrderFormComponent,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  clientService = inject(ClientService);
  productService = inject(ProductService);
  orderService = inject(OrderService);

  clients: Client[] = [];
  products: Product[] = [];
  orders: Order[] = [];

  isEditing = false;
  partial: Partial<Order> = {};

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }

  changeModeToEdit(order: Order) {
    this.isEditing = true;
    this.partial = order;
  }

  changeModeToView() {
    this.isEditing = false;
    this.partial = {};
  }

  async deleteOrder(id: string | undefined) {
    if (id != null) {
      await this.orderService.deleteOrder(id);
    }
  }

  async editOrder() {
    await this.orderService.updateOrder(this.partial);
    this.changeModeToView();
  }

  getClientNameById(id: string | undefined): string | null {
    const match = this.clients.find(client => client.id === id);
    return match?.name ?? null;
  }

  getProductNameById(id: string | undefined): string | null {
    const match = this.products.find(product => product.id === id);
    return match?.name ?? null;
  }

}
