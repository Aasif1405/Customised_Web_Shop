import express, { request, response } from 'express';
//import { router } from './routes/router.js';
//import { animalRoutes } from './routes/animal.js';
import mongoose from 'mongoose';
//import { LoggingMiddleware } from './middleware/logging.js'
//import { logger } from './utils/logger.js';
//import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';

const PORT = 3000;
// 
const server = express();
// 
server.use(express.json());

// tell express the use our new logger
server.use(LoggingMiddleware);

// 
server.use(express.static(`${import.meta.dirname}/../client`));
server.use('/node_modules', express.static(import.meta.dirname + '/../../node_modules'));

// tell the server to use our imported router 
//server.use(router);
server.use(ErrorHandlingMiddleware);
// server.use(animalRoutes);
server.use((error, request, response, next) =>{

  const {message, stack } = error;
  const {method, originalUrl, headers, query, body, params } = request
  const context = {
    time: (new Date().getTime()),
    stack,

    request: {
        method,
        path: originalUrl,
        body,
        params,
        query,
        headers
    },
        response:{
          body: response.locals.data,
          statusCode: error.status ?? 500

        }
      }
  logger.error(`${error.status ?? 500}: ${message}`, context);
  response.status (error.status ?? 500).send ({ error: message})

});

 try{
     //Connect to the database
   await mongoose.connect("mongodb://localhost:27017/inft2202")
    console.log('Connected to the database!');
    //to start the port
    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
 } catch (error) {
   console.log('Failed to connect the database', error);
   process.exit(1);

 };

