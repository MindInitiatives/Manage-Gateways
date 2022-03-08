const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Schema = mongoose.Schema;

// Create Schema
const PeripheralsSchema = new Schema({
        uid: {
            type: 'object',
            value: {
                type: 'Buffer'
            },
            default: () => MUUID.v1(),
            unique: true
        },
        vendor: {
            type: String,
            required: true
        },
        date_created: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String
        }
});

module.exports = Peripherals = mongoose.model('peripherals', PeripheralsSchema);