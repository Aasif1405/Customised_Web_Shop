import express, { response } from 'express';

//  create and export the router so the server can import it.
export const router = express.Router();

//  import routes from the sub-router
//import { contentRoutes } from './content.js';
import { animalRoutes } from './animals.js';


// apply the sub-router to the main router
//router.use(contentRoutes);
router.use('/api', animalRoutes);

