import productService from './product.mock.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const products = productService.listProducts();

    if (products.length === 0) {
        productContainer.innerHTML = '<p>The shop is currently closed.</p>';
    } else {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            productCard.innerHTML = `
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                    <p class="card-text">Stock: ${product.stock}</p>
                    <button class="btn btn-primary add-to-cart">Add to cart</button>
                    <button class="btn btn-warning edit-product" data-name="${product.name}">Edit</button>
                    <button class="btn btn-danger delete-product" data-name="${product.name}">Delete</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', (event) => {
                const productName = event.target.dataset.name;
                window.location.href = `add.html?name=${productName}`;
            });
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', (event) => {
                const productName = event.target.dataset.name;
                if (confirm(`Are you sure you want to delete ${productName}?`)) {
                    if (productService.deleteProduct(productName)) {
                        alert('Product deleted successfully!');
                        window.location.reload();
                    } else {
                        alert('Failed to delete product.');
                    }
                }
            });
        });
    }
});
