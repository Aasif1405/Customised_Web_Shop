//import productService from './product.mock.service.js';
import { Product } from './Product.js';
import { createMockProductService } from './product.service.mock.js';
import { createProductService } from './product.service.js';


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');

    if (productName) {
        // Editing an existing product
        document.querySelector('h1').textContent = 'Edit Product';
        const submitButton = document.getElementById('submitButton');
        submitButton.textContent = 'Update Product';

        const product = productService.findProduct(productName);
        if (product) {
            // Populate form fields with existing product details
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productDescription').value = product.description;
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Get updated values from form fields
            const name = document.getElementById('productName').value.trim();
            const price = document.getElementById('productPrice').value.trim();
            const stock = document.getElementById('productStock').value.trim();
            const description = document.getElementById('productDescription').value.trim();

            // Validate the form inputs using the function from add.js
            if (!validateProductForm(name, price, stock, description)) {
                return;
            }

            // Create updated product object
            const updatedProduct = new Product(name, price, stock, description);
            // Update the product
            if (await productService.editProduct(productName, updatedProduct)) {
                alert('Product updated successfully!');
                window.location.href = 'list.html';
            } else {
                alert('Failed to update product.');
            }
        });
    }
});
