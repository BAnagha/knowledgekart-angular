import {BookOrder} from "./book-order.model";

export class BookOrders {
    bookOrders: BookOrder[] = [];
    discountCode!: string;
    isDiscountApplied: boolean = false;
    totalPrice: number = 0;
}