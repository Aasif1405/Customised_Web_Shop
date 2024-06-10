import productService from './product.mock.service.js';
import { Product } from './Product.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('perfume-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const stock = document.getElementById('productStock').value.trim();
        const description = document.getElementById('productDescription').value.trim();

        if (!name || !price || !stock || !description) {
            alert('Please fill in all fields.');
            return;
        }

        const product = new Product(name, price, stock, description);
        if (productService.addProduct(product)) {
            alert('Product added successfully!');
            window.location.href = 'list.html';
        } else {
            alert('Product with this name already exists.');
        }
    });
});
