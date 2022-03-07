const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Schema = mongoose.Schema;

// Create Schema
const GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    gateway_name: {
        type: String,
        required: true
    },
    IPV4_address: {
        type: String,
        required: true
    },
    peripheral_devices: {
        uid: {
            type: 'object',
            value: { type: 'Buffer' },
            default: () => MUUID.v1(),
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
    }
});

module.exports = Gateway = mongoose.model('gateway', GatewaySchema);