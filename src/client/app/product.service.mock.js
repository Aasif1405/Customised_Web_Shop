// product.service.mock.js


import { Product } from './Product.js';

// Define your product service function
function createMockProductService() {
    const productsKey = 'products';
    let products = JSON.parse(localStorage.getItem(productsKey)) || [];
    let currentPage = 1;
    const productsPerPage = 5; // Number of products per page

    const listProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = products.slice(startIndex, endIndex);
        return currentProducts.map(product => new Product(product.name, product.price, product.stock, product.description));
    };

    const findProduct = (name) => {
        return products.find(product => product.name === name);
    };

    const addProduct = (product) => {
        if (findProduct(product.name)) {
            return false; // Product already exists
        }
        products.push(product);
        saveProducts();
        return true; // Product added successfully
    };

    const editProduct = (name, updatedProduct) => {
        const index = products.findIndex(product => product.name === name);
        if (index === -1) return false; // Product not found
        products[index] = updatedProduct;
        saveProducts();
        return true; // Product updated successfully
    };

    const deleteProduct = (name) => {
        const index = products.findIndex(product => product.name === name);
        if (index === -1) return false; // Product not found
        products.splice(index, 1);
        saveProducts();
        return true; // Product deleted successfully
    };

    const saveProducts = () => {
        localStorage.setItem(productsKey, JSON.stringify(products));
    };

    const setPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(products.length / productsPerPage)) {
            currentPage = pageNumber;
        }
    };

    const nextPage = () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            currentPage--;
        }
    };

    return {
        listProducts,
        findProduct,
        addProduct,
        editProduct,
        deleteProduct,
        setPage,
        nextPage,
        prevPage
    };
}

// Export the function as default
export { createMockProductService };
