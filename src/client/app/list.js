import { createProductService } from './product.service.js';

const host = 'https://inft2202.paclan.net';
const apikey = '6670ebfa166b62a518b6b1be';
const productService = createProductService(host, apikey);

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('perfumes-list');
    const pagination = document.getElementById('pagination');
    const messageBox = document.getElementById('message-box');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner-border', 'text-primary');
    spinner.role = 'status';
    spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';
    document.body.appendChild(spinner);
    spinner.style.display = 'none';

    const productsPerPage = 5;
    const currentPage = getCurrentPageNumber();

    async function loadProducts(page, perPage) {
        try {
            spinner.style.display = 'block';
            const data = await productService.listProducts(page, perPage);
            spinner.style.display = 'none';

            productContainer.innerHTML = '';
            if (data.products.length === 0) {
                productContainer.innerHTML = '<tr><td colspan="6">The shop is currently closed.</td></tr>';
            } else {
                data.products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.brand}</td>
                        <td>${product.volume}</td>
                        <td>$${product.price}</td>
                        <td>${product.description}</td>
                        <td>
                            ${product.owner === 'currentUser' ? `
                            <button class="btn btn-warning edit-product" data-id="${product.id}">Edit</button>
                            <button class="btn btn-danger delete-product" data-id="${product.id}">Delete</button>` : ''}
                        </td>
                    `;
                    productContainer.appendChild(row);
                });

                document.querySelectorAll('.edit-product').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productId = event.target.dataset.id;
                        window.location.href = `add.html?id=${productId}`;
                    });
                });

                document.querySelectorAll('.delete-product').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productId = event.target.dataset.id;
                        $('#deleteModal').modal('show');

                        document.getElementById('confirmDelete').onclick = async () => {
                            try {
                                spinner.style.display = 'block';
                                await productService.deleteProduct(productId);
                                spinner.style.display = 'none';
                                loadProducts(currentPage, productsPerPage);
                                $('#deleteModal').modal('hide');
                            } catch (error) {
                                spinner.style.display = 'none';
                                messageBox.innerText = error.message;
                                messageBox.classList.remove('d-none');
                            }
                        };
                    });
                });
            }

            setupPagination(data.totalPages, page);
        } catch (error) {
            spinner.style.display = 'none';
            messageBox.innerText = error.message;
            messageBox.classList.remove('d-none');
        }
    }

    function setupPagination(totalPages, currentPage) {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item', i === currentPage ? 'active' : '');
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                loadProducts(i, productsPerPage);
            });
            pagination.appendChild(li);
        }

        // Previous and Next buttons
        const prevButton = document.createElement('li');
        const prevLink = document.createElement('a');
        prevLink.href = `#`;
        prevLink.innerText = 'Previous';
        prevLink.classList.add('page-link');
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) loadProducts(currentPage - 1, productsPerPage);
        });
        prevButton.classList.add('page-item');
        prevButton.appendChild(prevLink);
        pagination.insertBefore(prevButton, pagination.firstChild);

        const nextButton = document.createElement('li');
        const nextLink = document.createElement('a');
        nextLink.href = `#`;
        nextLink.innerText = 'Next';
        nextLink.classList.add('page-link');
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) loadProducts(currentPage + 1, productsPerPage);
        });
        nextButton.classList.add('page-item');
        nextButton.appendChild(nextLink);
        pagination.appendChild(nextButton);
    }

    function getCurrentPageNumber() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page')) || 1;
    }

    loadProducts(currentPage, productsPerPage);
});
