const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema( {
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    caption: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Meme', memeSchema);