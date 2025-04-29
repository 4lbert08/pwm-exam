import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ClientService} from '../../services/client-crud/client.service';

@Component({
  selector: 'app-client-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  clientService= inject(ClientService);

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  async onSubmit() {
    await this.clientService.addClient(this.form.value);
    this.form.reset();
  }
}
