import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksComponent } from './books/books.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthenticationService } from './services/authentication-service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-knowledgekart',
  templateUrl: './knowledgekart.component.html',
  styleUrls: ['./knowledgekart.component.css']
})
export class KnowledgekartComponent implements OnInit {

  private collapsed = true;
  orderFinished = false;
  isUserLoggedIn = false;

  @ViewChild('booksC')
  booksC!: BooksComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC!: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC!: OrdersComponent;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
      this.orderFinished = orderFinished;
  }

  reset() {
      this.orderFinished = false;
      this.booksC.reset();
      this.shoppingCartC.reset();
      this.ordersC.paid = false;
  }

}
