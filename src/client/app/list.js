import productService from './product.mock.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('perfumes-list');
    const pagination = document.getElementById('pagination');

    const productsPerPage = 5;
    const currentPage = getCurrentPageNumber();
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const products = productService.listProducts();
    const paginatedProducts = products.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
        productContainer.innerHTML = '<tr><td colspan="6">The shop is currently closed.</td></tr>';
    } else {
        paginatedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${product.volume}</td>
                <td>$${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button class="btn btn-warning edit-product" data-name="${product.name}">Edit</button>
                    <button class="btn btn-danger delete-product" data-name="${product.name}">Delete</button>
                </td>
            `;
            productContainer.appendChild(row);
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

    // Pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `list.html?page=${i}`;
        link.innerText = i;
        li.appendChild(link);
        pagination.appendChild(li);
    }

    // Previous and Next buttons
// Previous and Next buttons
const prevButton = document.createElement('li');
const prevLink = document.createElement('a');
prevLink.href = `list.html?page=${currentPage > 1 ? currentPage - 1 : 1}`;
prevLink.innerText = 'Previous';
prevLink.classList.add('pagination-button'); // Add class to previous button
prevButton.appendChild(prevLink);
pagination.insertBefore(prevButton, pagination.firstChild);

const nextButton = document.createElement('li');
const nextLink = document.createElement('a');
nextLink.href = `list.html?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`;
nextLink.innerText = 'Next';
nextLink.classList.add('pagination-button'); // Add class to next button
nextButton.appendChild(nextLink);
pagination.appendChild(nextButton);

});

function getCurrentPageNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page')) || 1;
}
