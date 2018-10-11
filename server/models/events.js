const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location:  {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Event = mongoose.model('Event', eventSchema)

module.exports = Event;