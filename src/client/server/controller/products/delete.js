import { response } from "express";
import Animal from '../../models/Animal.js';

const handle = async (request, response, next) => {
    try {
        const { animalId } = request.params;
        const animal = await Animal.findOneAndDelete({ _id: animalId });
        if (!animal) {
            return response.status(404).json({ message: 'Animal not found' });
        }
        response.json({ message: 'Animal deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default { handle };
