// import mongoose and schema from mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// create Schema for database
const UserSchema = new Schema({
    name: { type: String },
    last_name: { type: String },
    user: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
    country: { type: String },
    passwordToken: { type: String },
    passwordExprire: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// export schema (object for BD) converted model mongoose
module.exports = mongoose.model('Users', UserSchema);