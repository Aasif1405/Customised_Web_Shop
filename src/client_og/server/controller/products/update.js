import { response } from "express";
import Product from '../../models/Product.js';

const handle = async (request, response, next) => {
    try {
        const { productId } = request.params;
        const updates = request.body;
        const product = await Product.findOneAndUpdate(
            { _id: productId },
            updates,
            { new: true }
        );
        if (!product) {
            return response.status(404).json({ message: 'product not found' });
        }
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export default { handle };
