import { response } from "express";
import Animal from "../../models/Animal.js";

const handle = async (request, response, next) => {
    try{
        const {name, breed, eyes, legs, sound } = request.body;
        const exists = await Animal.findOne
        const animal = await Animal.create({ name, breed, legs, eyes, sound})
        
        response.json(animal);
    } catch (error) {
        next(error);

    }
};

export default { handle };