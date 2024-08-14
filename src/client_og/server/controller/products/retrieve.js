import { response } from "express";
import Product from "../../models/Product.js";
import { NotFoundError } from '../../errors/NotFoundError.js';

const handle = async (request, reponse, next) => {
    try{

        const product = Product.findOne({
            _id: request.params.productId
        });
        if (!product) {
            throw new NotFoundError('Could not find that product.')
        }
        response.json(product);
    } catch (error) {
        next(error);

    }
};

export default { handle };