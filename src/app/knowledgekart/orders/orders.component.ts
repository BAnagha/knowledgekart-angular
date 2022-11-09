import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Globals } from '../globals';
import { BookOrder } from '../models/book-order.model';
import { BookOrders } from '../models/book-orders.model';
import { AuthenticationService } from '../services/authentication-service';
import { BookOrderService } from '../services/book-order-service';
import { KnowledgeKartService } from '../services/KnowledgeKartService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../../../assets/css/normalize.css', '../../../assets/css/vendor.css', '../../../assets/icomoon/icomoon.css', '../../../assets/style.css']
})
export class OrdersComponent implements OnInit {

  orders: BookOrders;
  total!: number;
  paid!: boolean;
  sub!: Subscription;
  loggedInUser: any;
  userLoggedIn = false;

  constructor(private knowledgeKartService: KnowledgeKartService, private bookOrderService: BookOrderService, private authService: AuthenticationService, private globals: Globals, private router: Router) {
      this.orders = this.knowledgeKartService.BookOrders;
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      this.loggedInUser = this.globals.loggedInUser;
      this.userLoggedIn = true;
    }
    this.paid = false;
      this.sub = this.knowledgeKartService.OrdersChanged.subscribe(() => {
          this.orders = this.knowledgeKartService.BookOrders;
      });
      this.loadTotal();
  }

  pay() {
      this.paid = true;
      this.knowledgeKartService.saveOrder(this.orders).subscribe((value : any) =>
      {
        let order: any = value;
        this.bookOrderService.latestOrderId = order.id;
        this.globals.latestOrderId = order.id;
      });
  }

  loadTotal() {
      
          this.total = this.knowledgeKartService.Total;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
