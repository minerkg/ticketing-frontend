import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    PrimeTemplate,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
