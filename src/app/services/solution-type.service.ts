import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {SolutionType} from '../models/solutionType';

@Injectable({
  providedIn: 'root'
})
export class SolutionTypeService {



  getAllActive() {
    //TODO: get all solution types
    return of(new Array<SolutionType>());
  }
}
