import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { BookOrder } from "../models/book-order.model";
import { BookOrders } from "../models/book-orders.model";
import {HttpClient} from '@angular/common/http';
import { Discount } from "../models/discount.model";


@Injectable({providedIn: 'root'})
export class KnowledgeKartService {
    
    private booksUrl = "knowledgekart/api/books";
    private ordersUrl = "knowledgekart/api/orders";
    private discountUrl = "knowledgekart/api/discount";
    private adminUrl = "knowledgekart/api/admin"

    private bookOrder!: BookOrder;
    private orders: BookOrders = new BookOrders();
    private discount!: Discount;

    private bookOrderSubject = new Subject();
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total!: number;

    BookOrderChanged = this.bookOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    getAvailableDiscount() {
       return this.http.get(this.discountUrl);
    }

    getAllBooks() {
        return this.http.get(this.booksUrl);
    }

    saveOrder(order: BookOrders) {
        return this.http.post(this.ordersUrl, order);
    }

    getLatestOrderId() {
        return this.http.get(this.ordersUrl+"/latestOrderId");
    }

    saveDiscount(discount: Discount) {
        return this.http.post(this.discountUrl, discount);
    }

    getOrderDetailsReport() {
        return this.http.get(this.adminUrl+"/orderDetails");
    }

    getOrderCountByDiscountCodeReport() {
        return this.http.get(this.adminUrl+"/countOfOrdersByDiscount");
    }

    getOrderCountByBookReport() {
        return this.http.get(this.adminUrl+"/orderCountByBook");
    }

    set SelectedBookOrder(value: BookOrder) {
        this.bookOrder = value;
        this.bookOrderSubject.next(this.bookOrder);
    }

    get SelectedBookOrder() {
        return this.bookOrder;
    }

    set BookOrders(value: BookOrders) {
        this.orders = value;
        this.ordersSubject.next(this.orders);
    }

    get BookOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next(this.total);
    }
}