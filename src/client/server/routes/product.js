import express, { request, response } from 'express';
import AnimalsCreateController from '../controllers/animals/create.js';
import AnimalsRetrieveController from '../controllers/animals/retrieve.js';
import AnimalsUpdateController from '../controllers/animals/update.js';
import AnimalsDeleteController from '../controllers/animals/delete.js';
import AnimalsSearchController from '../controllers/animals/search.js';
import { CheckValidation } from '../middleware/validation.js'


export const animalRoutes = express.Router();


animalRoutes.get('/animals',CheckValidation(AnimalsSearchController.rules), AnimalsSearchController.handle);
// Create

animalRoutes.post('/animals', AnimalsCreateController.handle);
// Retrieve

animalRoutes.get('/animals/:animalId', AnimalsRetrieveController.handle);

// Update

animalRoutes.put('/animals/:animalId', (request, response, next) => {
    response.end(`update animal with id: ${request.params.animalId}`)
});
// Delete
animalRoutes.delete('/animals/:animalId', (request, response, next) => {
    response.end(`update animal with id: ${request.params.animalId}`)
});