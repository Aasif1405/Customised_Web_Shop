import productService from './product.mock.service.js';
import { Product } from './Product.js';
import { validateProductForm } from './add.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');

    if (productName) {
        document.querySelector('h1').textContent = 'Edit Product';
        const submitButton = document.getElementById('submitButton');
        submitButton.textContent = 'Update Product';

        const product = productService.findProduct(productName);
        if (product) {
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productDescription').value = product.description;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
// The trim() method of String values removes whitespace from both ends of this string and returns a new string, without modifying the original - Reference MDN web Doc
            const name = document.getElementById('productName').value.trim();
            const price = document.getElementById('productPrice').value.trim();
            const stock = document.getElementById('productStock').value.trim();
            const description = document.getElementById('productDescription').value.trim();

            if (!validateProductForm(name, price, stock, description)) {
                return;
            }

            const updatedProduct = new Product(name, price, stock, description);
            if (productService.editProduct(productName, updatedProduct)) {
                alert('Product updated successfully!');
                window.location.href = 'list.html';
            } else {
                alert('Failed to update product.');
            }
        });
    }
});
