import createProductTemplate from './create-product.ejs'; // Import the EJS template file

// Define the async function to handle the creation of the product page
const createProduct = async () => {
    // Call onInit to handle any initialization needed before rendering
    const initData = await onInit();

    // Convert the EJS template into a string
    const htmlString = createProductTemplate(initData);

    // Insert the HTML string into the DOM
    document.getElementById('main-content').innerHTML = htmlString;

    // Call onRender to handle any finalization needed after rendering
    onRender();
};

// Initialization function
const onInit = async () => {
    // Example of fetching initial data, if needed
    //const response = await fetch('/api/products');
    // const data = await response.json();

    // Return any data needed by the template
    return {};
};

// Finalization function
const onRender = () => {
    // Add event handlers or any other DOM manipulations needed after rendering
    document.getElementById('productForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        // Perform AJAX request to save the product
        await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Optionally redirect or show a success message
        window.location.href = '/product-list';
    });
};

// Export the function to use in routing
export default createProduct;
