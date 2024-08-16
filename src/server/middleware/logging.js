import { response } from "express";
import { logger } from "../utils/logger.js";
export const LoggingMiddleware = (request, response, next) =>
{
   
    // console.log(method + '' + path)
    logRequest(request, response);
    response.once('finish', () => logRequest(request, response))
    next();
}

const logRequest = async (request, response) => {

    const { body, params, query, path, method, headers, originalUrl } = request;
    const time = new Date().toISOString();

    const { statusCode } = response;
    const og = response.json;
    
    response.json = async (value) => {
        const data = await Promise.resolve(value);
        response.locals.data =data
        return  og.call(response,data);
    }

    
    const context = {
        time,
        request: {
            body,
            params,
            query,
            headers
        },
        response:{
            body: response.locals.data,
            statusCode
        }

    }
    if (response.headersSent){
        logger.info(`RESPONSE ${statusCode}: ${method} ${originalUrl}`, context)
    } else{
    logger.info(`REQUEST: ${method} ${originalUrl}`, context);
    }

}