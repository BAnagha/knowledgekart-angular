import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookOrder } from '../models/book-order.model';
import { BookOrders } from '../models/book-orders.model';
import { Book } from '../models/book.model';
import { Discount } from '../models/discount.model';
import { KnowledgeKartService } from '../services/KnowledgeKartService';
import { BookOrderService } from '../services/book-order-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['../../../assets/css/normalize.css', '../../../assets/css/vendor.css', '../../../assets/icomoon/icomoon.css', '../../../assets/style.css']
})
export class BooksComponent implements OnInit {

  bookOrders: BookOrder[] = [];
  books: Book[] = [];
  selectedBookOrder!: BookOrder;
  private shoppingCartOrders!: BookOrders;
  sub!: Subscription;
  bookSelected: boolean = false;
  discount!: Discount;
  latestOrderId!: number;
  customerEligible: boolean = false;
  orders!: BookOrders;
  total: number;
  loggedInUser: any;
  userLoggedIn = false;

  constructor(private knowledgeKartService: KnowledgeKartService, private bookOrderService: BookOrderService, private router: Router, private authService: AuthenticationService, private globals: Globals) {
  this.total = 0;
  }

  navigateToCart(){
    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      this.loggedInUser = this.globals.loggedInUser;
      this.userLoggedIn = true;
    }
    this.loaddiscount();
     this.orders = new BookOrders();
      this.getLatestOrderId();
      this.bookOrders = [];
      this.loadBooks();
      this.loadOrders();
      this.loadCart();
  }

  getLatestOrderId() {
    this.knowledgeKartService.getLatestOrderId().subscribe((v : any) => {this.latestOrderId = v;
       this.bookOrderService.latestOrderId = this.latestOrderId; });
  }

  loaddiscount() {
    this.knowledgeKartService.getAvailableDiscount().subscribe((value : any) => {
      this.discount = value;
    this.bookOrderService.discount = this.discount;
    this.checkDiscountEligibility();
  });
    
  }

  checkDiscountEligibility() {
    if(this.latestOrderId !== 0 && (this.latestOrderId+1)%this.discount.transactionMultiplier == 0){
       this.customerEligible = true;
       this.bookOrderService.customerEligible = true;
    }
  }

  addToCart(order: BookOrder) {
      order.quantity = 1;
      this.knowledgeKartService.SelectedBookOrder = order;
      this.selectedBookOrder = this.knowledgeKartService.SelectedBookOrder;
      this.bookSelected = true;
  }

  loadCart() {
    this.sub = this.knowledgeKartService.BookOrderChanged.subscribe(() => {
        let bookOrder = this.knowledgeKartService.SelectedBookOrder;
        if (bookOrder) {
            this.orders.bookOrders.push(new BookOrder(
                bookOrder.book, bookOrder.quantity));
        }
        this.knowledgeKartService.BookOrders = this.orders;
        this.orders = this.knowledgeKartService.BookOrders;
    });
}

  removeFromCart(bookOrder: BookOrder) {
      let index = this.getBookIndex(bookOrder.book);
      if (index > -1) {
          this.shoppingCartOrders.bookOrders.splice(
              this.getBookIndex(bookOrder.book), 1);
      }
      this.knowledgeKartService.BookOrders = this.shoppingCartOrders;
      this.shoppingCartOrders = this.knowledgeKartService.BookOrders;
      this.bookSelected = false;
  }

  getBookIndex(book: Book): number {
      return this.knowledgeKartService.BookOrders.bookOrders.findIndex(
          value => value.book === book);
  }

  isBookSelected(book: Book): boolean {
      return this.getBookIndex(book) > -1;
  }

  loadBooks() {
      this.knowledgeKartService.getAllBooks().subscribe((value : any) => {

        value.forEach((book: Book) => {
                      this.bookOrders.push(new BookOrder(book, 0));
                  })
      }, (error) => console.log(error));
  }

  loadOrders() {
      this.sub = this.knowledgeKartService.OrdersChanged.subscribe(() => {
          this.shoppingCartOrders = this.knowledgeKartService.BookOrders;
      });
  }

  reset() {
      this.bookOrders = [];
      this.loadBooks();
      this.knowledgeKartService.BookOrders.bookOrders = [];
      this.loadOrders();
      this.bookSelected = false;
  }


}
