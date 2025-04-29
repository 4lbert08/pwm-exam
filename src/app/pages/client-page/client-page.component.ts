import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {ClientFormComponent} from '../../components/client-form/client-form.component';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client-crud/client.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-page',
  imports: [
    HeaderComponent,
    ClientFormComponent,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit {
  clientService= inject(ClientService);
  clients: Client[] = [];

  isEditing = false;
  partial: Partial<Client> = {};

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })
  }

  changeModeToEdit(client: Client) {
    this.isEditing = true;
    this.partial = client;
  }

  changeModeToView() {
    this.isEditing = false;
    this.partial = {};
  }

  async deleteClient(id: string | undefined) {
    if (id != null) {
      await this.clientService.deleteClient(id);
    }
  }

  async editClient() {
    await this.clientService.updateClient(this.partial);
    this.changeModeToView();
  }
}
