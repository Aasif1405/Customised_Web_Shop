import { response } from "express";
import Product from '../../models/Product.js';

const handle = async (request, response, next) => {
    try {
        const { productId } = request.params;
        const product = await Product.findOneAndDelete({ _id: productId });
        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }
        response.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default { handle };
