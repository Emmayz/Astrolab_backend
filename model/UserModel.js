//Import Mongoose
const mongoose = require('mongoose');

//Create the Schema
const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },   
        avatar: {
            type: String,
            required: false
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }                  
    }
)

//Create the Model

const UserModel = mongoose.model("user",UserSchema);

//Export the Model
module.exports = UserModel;