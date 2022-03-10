const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// Create Schema

var GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        default: "GTW-" + crypto.randomBytes(6).toString("hex"),
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
    peripheral_devices:
        [{
        uid: {
            type: 'object',
            value: {
                type: 'Buffer'
            },
            default: () => MUUID.v1().toString(),
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
        }]

});

GatewaySchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Gateway = mongoose.model('gateway', GatewaySchema);

module.exports = Gateway