import { Injectable } from '@angular/core';
import { Discount } from '../models/discount.model';

@Injectable({providedIn: 'root'})
export class BookOrderService {

  latestOrderId!: number;
  shoppingCartTotal!: number;
  discount!: Discount;
  customerEligible!: boolean;
  constructor() { }

  
  get getLatestOrderId() : number {
    return this.latestOrderId;
  }
   
  get getShoppingCartTotal() : number {
    return this.shoppingCartTotal;
   }

   
   set setLatestOrderId(v : number) {
    this.latestOrderId = v;
   }

    set setShoppingCartTotal(v : number) {
    this.latestOrderId = v;
   }

   get getDiscount() : Discount {
    return this.discount;
   }

   
   public set setDiscount(v : Discount) {
    this.discount = v;
   }

   get isCustomerEligible() : boolean {
    return this.customerEligible;
   }

   
   public set setisCustomerEligible(v : boolean) {
    this.customerEligible = v;
   }

}