import {Book} from "./book.model";

export class BookOrder {
    book: Book;
    quantity: number;

    constructor(book: Book, quantity: number) {
        this.book = book;
        this.quantity = quantity;
    }
}