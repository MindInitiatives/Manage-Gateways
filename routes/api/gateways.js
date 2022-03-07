const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const crypto = require('crypto');

// Item Model
const Gateway = require('../../models/Gateway');

// @router GET api/gateways
// @desc   Get All Gateways
// @access Public
router.get('/', (req, res) => {
    Gateway.find()
        .sort({
            date: -1
        })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));
});

// @router GET api/gateways/:id
// @desc   Get a gateway data
// @access Private
router.get('/:id', (req, res) => {
    Gateway.findById(req.params.id)
        .then(gateway => res.json(gateway))
        .catch(err => res.status(404).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));
})

// @router POST api/gateways
// @desc   Create a new gateway
// @access Private
router.post('/', (req, res) => {

    const newGateway = new Gateway({
        serialNumber: "GTW-" + crypto.randomBytes(6).toString("hex"),
        gateway_name: req.body.gateway_name,
        IPV4_address: req.body.IPV4_address,
        peripheral_devices: req.body.peripheral_devices
    });

    //Simple validation
    if (!newGateway.gateway_name || !newGateway.IPV4_address || !newGateway.peripheral_devices.vendor) {
        return res.status(400).json({
            statusMessage: 'Please fill in required fields '
        });
    }

    //Check for existing user
    Gateway.findOne({
            gateway_name
        })
        .then(gateway => {
            if (gateway) return res.status(400).json({
                statusMessage: 'Gateway already exists'
            });
            newGateway.save()
                .then(item => res.json(item))
                .catch(err => res.status(404).json({
                    success: false,
                    statusMessage: err.message,
                    statusCode: res.statusCode
                }));
        })

});

// @router PUT api/gateways/:id
// @desc   Update a gateway
// @access Private
router.put('/:id', (req, res) => {

    const newGateway = {
        gateway_name: req.body.gateway_name,
        IPV4_address: req.body.IPV4_address,
        vendor: req.body.peripheral_devices.vendor
    };

    //Simple validation
    // if (!newGateway.gateway_name || !newGateway.IPV4_address || !newGateway.vendor) {
    //     return res.status(400).json({
    //         statusMessage: 'Please fill in required fields '
    //     });
    // }

    Gateway.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { useFindAndModify: false, upsert: true })
        .then(data => {
            res.json({
                success: true,
                statusMessage: "Gateway was updated successfully.",
                statusCode: res.statusCode
            });
        })
        .catch(err => res.status(404).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));

});

// @router DELETE api/gateways
// @desc   Delete a Gateway
// @access Private
router.delete('/:id', (req, res) => {
    Gateway.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({
            success: true,
            statusMessage: 'Gateway deleted successfully'
        })))
        .catch(err => res.status(404).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));
});

module.exports = router;