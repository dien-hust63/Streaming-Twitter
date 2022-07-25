const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    created_at: {
        type: String,
        required: true
    },
    processed_text: {
        type: String,
        required: true
    },
    subjectivity: {
        type: String,
        required: true
    },
    polarity: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Test', dataSchema);

module.exports = Data