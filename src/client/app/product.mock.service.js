import { Product } from './Product.js';

class ProductService {
    constructor() {
        this.productsKey = 'products';
        this.products = JSON.parse(localStorage.getItem(this.productsKey)) || [];
        this.currentPage = 1;
        this.productsPerPage = 5; // Number of products per page
    }

    listProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const currentProducts = this.products.slice(startIndex, endIndex);

        return currentProducts.map(product => new Product(product.name, product.price, product.stock, product.description));
    }

    findProduct(name) {
        return this.products.find(product => product.name === name);
    }

    addProduct(product) {
        if (this.findProduct(product.name)) {
            return false; // Product already exists
        }
        this.products.push(product);
        this.saveProducts();
        return true; // Product added successfully
    }

    editProduct(name, updatedProduct) {
        const index = this.products.findIndex(product => product.name === name);
        if (index === -1) return false; // Product not found
        this.products[index] = updatedProduct;
        this.saveProducts();
        return true; // Product updated successfully
    }

    deleteProduct(name) {
        const index = this.products.findIndex(product => product.name === name);
        if (index === -1) return false; // Product not found
        this.products.splice(index, 1);
        this.saveProducts();
        return true; // Product deleted successfully
    }

    saveProducts() {
        localStorage.setItem(this.productsKey, JSON.stringify(this.products));
    }

    setPage(pageNumber) {
        if (pageNumber > 0 && pageNumber <= Math.ceil(this.products.length / this.productsPerPage)) {
            this.currentPage = pageNumber;
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.products.length / this.productsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
}

const productService = new ProductService();
export default productService;
