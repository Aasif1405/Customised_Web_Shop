
export function createProductService(host, apikey) {
    return new ProductService(host, apikey);
}

function ProductService(host, apikey) {
    this.host = host;
    this.apikey = apikey;
}

ProductService.prototype.listProducts = async function(page, perPage) {
    try {
        const response = await fetch(`${this.host}/api/products?page=${page}&perPage=${perPage}`, {
            headers: { 'Authorization': `Bearer ${this.apikey}` }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Check API key and permissions');
            }
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`Error in listProducts: ${error.message}`);
    }
};

ProductService.prototype.findProduct = async function(id) {
    try {
        const response = await fetch(`${this.host}/api/products/${id}`, {
            headers: { 'Authorization': `Bearer ${this.apikey}` }
        });
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to fetch product');
        }
    } catch (error) {
        throw new Error(`Error in findProduct: ${error.message}`);
    }
};

ProductService.prototype.addProduct = async function(product) {
    try {
        const response = await fetch(`${this.host}/api/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apikey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to add product');
        }
    } catch (error) {
        throw new Error(`Error in addProduct: ${error.message}`);
    }
};

ProductService.prototype.editProduct = async function(id, updatedProduct) {
    try {
        const response = await fetch(`${this.host}/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.apikey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        throw new Error(`Error in editProduct: ${error.message}`);
    }
};

ProductService.prototype.deleteProduct = async function(id) {
    try {
        const response = await fetch(`${this.host}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this.apikey}` }
        });
        if (response.status === 204) {
            return true;
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        throw new Error(`Error in deleteProduct: ${error.message}`);
    }
};

export default ProductService;
