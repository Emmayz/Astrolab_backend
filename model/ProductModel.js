//Import Mongoose
const mongoose = require('mongoose');

//Create the Schema
const ProductSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}
);

//Create the Model

const ProductModel = mongoose.model("product",ProductSchema);

//Export the Model
module.exports = ProductModel;