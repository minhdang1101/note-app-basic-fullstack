const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);