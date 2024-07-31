import { response } from "express";
import Animal from '../../models/Animal.js';

const handle = async (request, response, next) => {
    try {
        const { animalId } = request.params;
        const updates = request.body;
        const animal = await Animal.findOneAndUpdate(
            { _id: animalId },
            updates,
            { new: true }
        );
        if (!animal) {
            return response.status(404).json({ message: 'Animal not found' });
        }
        response.json(animal);
    } catch (error) {
        next(error);
    }
};

export default { handle };
