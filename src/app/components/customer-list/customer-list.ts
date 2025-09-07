import {Component, OnInit, signal} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Customer} from '../../models/customer';
import {CustomerService} from '../../services/customer.service';

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


  customerList = signal<Customer[]>([]);

  constructor(protected clientService: CustomerService) {
  }


  ngOnInit() {
    this.clientService.getAll().subscribe(response => {
      this.customerList.set(response);
    });
  }

}
