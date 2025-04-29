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
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  firestore = inject(Firestore);

  addProduct(product: Product) {
    const productRef = collection(this.firestore, "products");
    return addDoc(productRef, product);
  }

  getProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, "products");
    return collectionData(productRef, {idField:  "id"}) as Observable<Product[]>;
  }

  getProductById(id: string) {
    const productRef = doc(this.firestore, `products/${id}`);
    return docData(productRef, {idField:  "id"}) as Observable<Product>;
  }

  updateProduct(partial: Partial<Product>) {
    const productRef = doc(this.firestore, `products/${partial.id}`);
    return updateDoc(productRef, partial);
  }

  deleteProduct(id: string) {
    const productRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(productRef);
  }
}
