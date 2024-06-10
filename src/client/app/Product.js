export class Product {
    constructor(name, price, stock, description) {
        this.name = name;
        this.price = parseFloat(price).toFixed(2);
        this.stock = parseInt(stock, 10);
        this.description = description;
    }

    // Method to convert the product object to a string
    toString() {
        return `${this.name} - $${this.price}, Stock: ${this.stock}, Description: ${this.description}`;
    }
}
