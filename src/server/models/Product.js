import { model, Schema } from 'mongoose';
import Float from 'mongoose-float'; // Importing mongoose-float

// Load the Float type into mongoose
const FloatType = Float.loadType(mongoose, 2); 
// The second argument is the precision, here it is set to 2 decimal places

// Define the fields we want to see in the database
const fields = {
    name: {
        type: String,
        required: true
    },
    cost: {
        type: FloatType,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
};

// Create a mongoose schema
const schema = new Schema(fields);

// Use it to create and export a new model named 'Animal'
export default model('Product', schema);
