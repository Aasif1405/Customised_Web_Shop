import { response } from "express";
import Product from "../../models/Product.js";

const handle = async (request, response, next) => {
    try{
        const {name, breed, eyes, legs, sound } = request.body;
        const exists = await Product.findOne
        const product = await Product.create({ name, breed, legs, eyes, sound})
        
        response.json(product);
    } catch (error) {
        next(error);

    }
};

export default { handle };