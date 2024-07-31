import { response } from "express";
import Animal from "../../models/Animal.js";
import { NotFoundError } from '../../errors/NotFoundError.js';

const handle = async (request, reponse, next) => {
    try{
        // Animal.findOneAndUpdate(...) //https://mongoosejs.com/docs/tutorial/
        // Animal.findOneAndDelete(...)
        const animal = Animal.findOne({
            _id: request.params.animalId
        });
        if (!animal) {
            throw new NotFoundError('Could not find that animal.')
        }
        response.json(animal);
    } catch (error) {
        next(error);

    }
};

export default { handle };