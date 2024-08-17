import { getProducts, deleteProduct } from './list-products.ejs'; 

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

const onInit = async () => {
    await loadProducts();
    initializeEventListeners();
};

const loadProducts = async (page = 1, itemsPerPage = 10) => {
    try {
        const products = await getProducts(page, itemsPerPage); 
        const { data, totalPages } = products; 

        renderTable(data); 
        renderPagination(page, totalPages); 

        hideMessage();
    } catch (error) {
        showMessage('Failed to load products.'); 
    }
};

const renderTable = (products) => {
    const tableBody = document.querySelector('#perfumes-list tbody');
    tableBody.innerHTML = ''; 

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.volume}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-primary btn-sm edit" data-id="${product.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete" data-id="${product.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    initializeActionButtons();
};

const renderPagination = (currentPage, totalPages) => {
    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = ''; 

    for (let page = 1; page <= totalPages; page++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${page === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#" data-page="${page}">${page}</a>`;
        pagination.appendChild(pageItem);
    }
};

const initializeEventListeners = () => {
    const perPageDropdown = document.querySelector('#per-page-dropdown');
    perPageDropdown.addEventListener('change', async (event) => {
        const itemsPerPage = parseInt(event.target.value);
        await loadProducts(1, itemsPerPage); 
    });

    const pagination = document.querySelector('#pagination');
    pagination.addEventListener('click', async (event) => {
        const page = parseInt(event.target.getAttribute('data-page'));
        if (!isNaN(page)) {
            const itemsPerPage = parseInt(document.querySelector('#per-page-dropdown').value);
            await loadProducts(page, itemsPerPage); 
        }
    });
};

const initializeActionButtons = () => {
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            window.location.href = `/edit/${id}`;
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            showDeleteModal(id); 
        });
    });
};

const showDeleteModal = (id) => {
    const confirmDeleteButton = document.querySelector('#confirmDelete');
    confirmDeleteButton.onclick = async () => {
        try {
            await deleteProduct(id); 
            hideMessage(); 
            await loadProducts(); 
        } catch (error) {
            showMessage('Failed to delete product.'); 
        }
        const modal = bootstrap.Modal.getInstance(document.querySelector('#deleteModal'));
        modal.hide();
    };

    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'));
    modal.show();
};

const showMessage = (message) => {
    const messageBox = document.querySelector('#message-box');
    messageBox.textContent = message;
    messageBox.classList.remove('d-none');
};

const hideMessage = () => {
    const messageBox = document.querySelector('#message-box');
    messageBox.classList.add('d-none');
};

export default onInit;
