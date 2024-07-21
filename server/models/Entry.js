const mongoose=require('mongoose');
const { Schema } = mongoose;


const EntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    travelDates: {
        start: Date,
        end: Date
    },
    description: {
        type: String,
        required: true
    },
    photos: [String],
    tags: [String]
});

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
