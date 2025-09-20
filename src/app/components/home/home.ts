import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {PrimeTemplate} from 'primeng/api';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    Button,
    RouterLink,
    PrimeTemplate,
    Image
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
