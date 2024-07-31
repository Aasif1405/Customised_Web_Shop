import { model, Schema } from 'mongoose';

// Define the fields we want to see in the database
const fields = {
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        required: true
    },
    eyes: {
        type: String,
        required: true
    },
    sound: {
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
export default model('Animal', schema);
