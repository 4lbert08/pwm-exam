import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Order} from '../../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  firestore = inject(Firestore);

  addOrder(order: Order) {
    const orderRef = collection(this.firestore, "orders");
    return addDoc(orderRef, order);
  }

  getOrders(): Observable<Order[]> {
    const orderRef = collection(this.firestore, "orders");
    return collectionData(orderRef, {idField:  "id"}) as Observable<Order[]>;
  }

  getOrderById(id: string) {
    const orderRef = doc(this.firestore, `orders/${id}`);
    return docData(orderRef, {idField:  "id"}) as Observable<Order>;
  }

  updateOrder(partial: Partial<Order>) {
    const orderRef = doc(this.firestore, `orders/${partial.id}`);
    return updateDoc(orderRef, partial);
  }

  deleteOrder(id: string) {
    const orderRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderRef);
  }
}
