import { Product } from './Product.js';

class ProductService {
    constructor() {
        this.productsKey = 'products';
        this.products = JSON.parse(localStorage.getItem(this.productsKey)) || [];
    }

    listProducts() {
        return this.products.map(product => new Product(product.name, product.price, product.stock, product.description));
    }

    findProduct(name) {
        return this.products.find(product => product.name === name);
    }

    addProduct(product) {
        if (this.findProduct(product.name)) {
            return false;
        }
        this.products.push(product);
        this.saveProducts();
        return true;
    }

    editProduct(name, updatedProduct) {
        const index = this.products.findIndex(product => product.name === name);
        if (index === -1) return false;
        this.products[index] = updatedProduct;
        this.saveProducts();
        return true;
    }

    deleteProduct(name) {
        const index = this.products.findIndex(product => product.name === name);
        if (index === -1) return false;
        this.products.splice(index, 1);
        this.saveProducts();
        return true;
    }

    saveProducts() {
        localStorage.setItem(this.productsKey, JSON.stringify(this.products));
    }
}

const productService = new ProductService();
export default productService;
