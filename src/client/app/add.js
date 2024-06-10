import productService from './product.mock.service.js';
import { Product } from './Product.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const stock = document.getElementById('productStock').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const volume = document.getElementById('productVolume').value.trim();
        const brand = document.getElementById('productBrand').value.trim();

        if (!name || !price || !stock || !description || !volume || !brand) {
            alert('Please fill in all fields.');
            return;
        }

        const product = new Product(name, price, stock, description, volume, brand);
        if (productService.addProduct(product)) {
            alert('Product added successfully!');
            window.location.href = 'list.html';
        } else {
            alert('Product with this name already exists.');
        }
    });
});
