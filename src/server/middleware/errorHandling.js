import { logger } from '../utils/logger.js';
import { ConflictError } from "../errors/ConflictError.js";
 
export const ErrorHandlingMiddleware = (error,request,response,next) => {
    const {message,stack,statusCode = 500} = error;
    const {method,originalUrl,headers,query,body,params} = request;
    const context = {
        time: (new Date().getTime()),
        stack,
        request: {
            body,
            params,
            query,
            headers
        },
        response: {
            body: response.locals.data,
            statusCode
        },
        error
    }
 
    const responseObject = {message}
    if (error instanceof ConflictError) {
        responseObject.errors = error.details?.errors;
    }
 
    logger.error(`${statusCode ?? 500}: ${message}`, context);
    response.status(error.status ?? 500).send({error: message})
}