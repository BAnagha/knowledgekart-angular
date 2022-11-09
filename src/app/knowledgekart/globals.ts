import { Injectable } from '@angular/core';
import { Discount } from './models/discount.model';

@Injectable()
export class Globals {
  discount!: Discount;
  latestOrderId!: number;
  loggedInUser: any;

  
}