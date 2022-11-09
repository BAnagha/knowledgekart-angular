

export class Book {
    id: number;
    name: string;
    price: number;
    image_url: string;
    details_url: string;
    isbn13: number;
    subtitle: string;
    quantity: number;

    constructor(id: number, name: string, price: number, image_url: string, details_url: string, isbn13: number, subtitle: string, quantity: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image_url = image_url;
        this.details_url = details_url;
        this.isbn13 = isbn13;
        this. subtitle = subtitle;
        this.quantity = quantity;
    }
    
}