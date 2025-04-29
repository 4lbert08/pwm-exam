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
import {Client} from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  firestore = inject(Firestore);

  addClient(client: Client) {
    const clientRef = collection(this.firestore, "clients");
    return addDoc(clientRef, client);
  }

  getClients(): Observable<Client[]> {
    const clientRef = collection(this.firestore, "clients");
    return collectionData(clientRef, {idField:  "id"}) as Observable<Client[]>;
  }

  getClientById(id: string) {
    const clientRef = doc(this.firestore, `clients/${id}`);
    return docData(clientRef, {idField:  "id"}) as Observable<Client>;
  }

  updateClient(partial: Partial<Client>) {
    const clientRef = doc(this.firestore, `clients/${partial.id}`);
    return updateDoc(clientRef, partial);
  }

  deleteClient(id: string) {
    const clientRef = doc(this.firestore, `clients/${id}`);
    return deleteDoc(clientRef);
  }
}
