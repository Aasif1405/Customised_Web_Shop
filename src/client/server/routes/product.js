import express, { request, response } from 'express';
import ProductCreateController from '../controllers/Product/create.js';
import ProductRetrieveController from '../controllers/Product/retrieve.js';
import ProductUpdateController from '../controllers/Product/update.js';
import ProductDeleteController from '../controllers/Product/delete.js';
import ProductSearchController from '../controllers/Product/search.js';
import { CheckValidation } from '../middleware/validation.js'


export const productRoutes = express.Router();


productRoutes.get('/Product',CheckValidation(ProductSearchController.rules), ProductSearchController.handle);
// Create

productRoutes.post('/Product', ProductCreateController.handle);
// Retrieve

productRoutes.get('/Product/:productId', ProductRetrieveController.handle);

// Update

productRoutes.put('/Product/:productId', (request, response, next) => {
    response.end(`update product with id: ${request.params.productId}`)
});
// Delete
productRoutes.delete('/Product/:productId', (request, response, next) => {
    response.end(`update product with id: ${request.params.productId}`)
});