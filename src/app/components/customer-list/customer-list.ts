import {Component, OnInit, signal} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client-service';

@Component({
  selector: 'app-customer-list',
  imports: [
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {


  customerList = signal<Client[]>([]);

  constructor(protected clientService: ClientService) {
  }


  ngOnInit() {
    this.clientService.getAll().subscribe(response => {
      this.customerList.set(response);
    });
  }

}
