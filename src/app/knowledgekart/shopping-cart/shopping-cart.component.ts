import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Globals } from '../globals';
import { BookOrder } from '../models/book-order.model';
import { BookOrders } from '../models/book-orders.model';
import { AuthenticationService } from '../services/authentication-service';
import { BookOrderService } from '../services/book-order-service';
import { KnowledgeKartService } from '../services/KnowledgeKartService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['../../../assets/css/normalize.css', '../../../assets/css/vendor.css', '../../../assets/icomoon/icomoon.css', '../../../assets/style.css']
})
export class ShoppingCartComponent implements OnInit {

  orderFinished: boolean;
  orders!: BookOrders;
  total: number;
  sub!: Subscription;
  loggedInUser: any;
  userLoggedIn = false;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(private knowledgeKartService: KnowledgeKartService, private bookOrderService: BookOrderService, private authService: AuthenticationService, private globals: Globals, private router: Router) {
      this.total = 0;
      this.orderFinished = false;
      this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      this.loggedInUser = this.globals.loggedInUser;
      this.userLoggedIn = true;
    }
      this.orders = new BookOrders();
      this.loadCart();
      this.loadTotal();
  }

  private calculateTotal(Books: BookOrder[]): number {
      let sum = 0;
      Books.forEach(value => {
          sum += (value.book.price * value.quantity);
      });

      if(this.bookOrderService.customerEligible){
        sum = sum - (sum * this.bookOrderService.discount.percentDiscount)/100;
      }
      return sum;
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  finishOrder() {
      this.orderFinished = true;
      this.total = this.calculateTotal(this.orders.bookOrders);
      if(this.bookOrderService.customerEligible){
        this.orders.isDiscountApplied = true;
        this.orders.discountCode = this.bookOrderService.discount.discountCode;
      }
      this.orders.totalPrice = this.total;
      this.knowledgeKartService.Total = this.total;
      this.onOrderFinished.emit(this.orderFinished);
  }

  loadTotal() {
      this.sub = this.knowledgeKartService.OrdersChanged.subscribe(() => {
          this.total = this.calculateTotal(this.orders.bookOrders);
          if(this.bookOrderService.customerEligible){
            this.total = (this.total * this.bookOrderService.discount.percentDiscount)/100;
          }
      });
  }

  loadCart() {
          this.orders = this.knowledgeKartService.BookOrders;
  }

  reset() {
      this.orderFinished = false;
      this.orders = new BookOrders();
      this.orders.bookOrders = []
      this.loadTotal();
      this.total = 0;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
