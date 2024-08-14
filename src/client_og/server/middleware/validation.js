import { validationResult } from 'express-validator';
import { error } from 'winston';
import { ConflictError } from '../errors/ConflictError.js';

function doValidation (request, response, next){
    const result = validationResult(request);
    if (result.isEmpty()) { return next();}
    const errObj = {
        error: result.array()
    };
    next(new ConflictError('Input Validation Failed', errObj));
    //response.status(409).json ({errors: result.array()});


}

export function CheckValidation (rules){
    return [ rules, doValidation];
}