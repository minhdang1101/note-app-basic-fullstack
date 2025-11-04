const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    createOn: { type: Date, default: Date.now },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);