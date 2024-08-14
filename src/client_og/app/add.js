import ProductService from './product.service.js';
import { Product } from './Product.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const productService = new ProductService('https://inft2202.paclan.net', '6670ebfa166b62a518b6b1be');

    if (!form) {
        console.error('Form element not found.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const brand = document.getElementById('productBrand').value.trim();
        const volume = document.getElementById('productVolume').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const stock = document.getElementById('productStock').value.trim();


        // Create product object
        const product = {
            name,
            brand,
            volume: parseInt(volume),
            price: parseFloat(price),
            description,
            stock: parseInt(stock)
        };

        try {
            // Show loading spinner
            showLoading(true);

            // Call API to add product
            const addedProduct = await productService.addProduct(product);

            // Hide loading spinner
            showLoading(false);

            // Show success message
            showMessage('Product added successfully!', 'success');

            // Redirect to list page after delay
            setTimeout(() => {
                window.location.href = 'list.html';
            }, 1500);
        } catch (error) {
            // Hide loading spinner
            showLoading(false);

            // Show error message
            showMessage(`Failed to add product: ${error.message}`, 'danger');
        }
    });
});

function showLoading(isLoading) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.toggle('d-none', !isLoading);
    }
}

function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.classList.remove('d-none');
        messageBox.classList.add(`alert-${type}`);
    }
}
