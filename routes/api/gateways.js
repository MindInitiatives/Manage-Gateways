const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

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

// @router GET api/gateways?id
// @desc   Get a gateway data
// @access Private
router.get('/gateway', (req, res) => {
    Gateway.findById(req.query.id)
        .then(gateway => {console.log(gateway);res.json(gateway)})
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

    const newGateway = new Gateway(req.body);

    //Simple validation
    if (!req.body.gateway_name || !req.body.IPV4_address) {
        return res.status(400).json({
            statusMessage: 'Please fill in required fields '
        });
    }

    //Check for existing user
    Gateway.findOne({
            gateway_name: req.body.gateway_name
        })
        .then(gateway => {
            if (gateway) return res.status(404).json({
                statusMessage: 'Gateway already exists'
            });
            if(newGateway.peripheral_devices.length > 10) {
                return res.status(400).json({
                    statusMessage: 'no more that 10 peripheral devices are allowed for a gateway.'
                });
            }
            else {
            newGateway.save()
                .then(item => res.json(
                    {
                        success: true,
                        data: item,
                        statusMessage: "Gateway Created Successfully",
                        statusCode: res.statusCode
                    }
                ))
                .catch(err => res.status(404).json({
                    success: false,
                    statusMessage: err,
                    statusCode: res.statusCode
                }));
            }
        })
        .catch(err => res.status(500).json({
            success: false,
            statusMessage: err.statusMessage,
            statusCode: res.statusCode
        }));

});

// @router PUT api/gateways/gateway?id
// @desc   Update a gateway
// @access Private
router.put('/gateway', (req, res) => {

    Gateway.findByIdAndUpdate(
        req.query.id, 
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

// @router PUT api/gateways/gateway/device?status
// @desc   Update a gateway peripheral status
// @access Private
router.put('/gateway/device', async (req, res) => {
    await Gateway.updateOne(
        {"id": req.query.id, "peripheral_devices.uid": req.query.uid }, 
        { $set: { "peripheral_devices.$.status": req.body.status } })
        .then(data => {
            console.log(data)
            res.json({
                success: true,
                statusMessage: "status updated successfully.",
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
// @desc   Delete all Gateways
// @access Private
router.delete('/', (req, res) => {
    Gateway.deleteMany({})
        .then(item => res.json({
            success: true,
            statusMessage: `All Gateways deleted successfully`,
            statusCode: res.statusCode
        }))
        .catch(err => res.status(500).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));
});

// @router DELETE api/gateways/gateway?id
// @desc   Delete a Gateway
// @access Private
router.delete('/gateway', (req, res) => {
    Gateway.findById(req.query.id)
        .then(item => item.remove().then(() => res.json({
            success: true,
            statusMessage: 'Gateway deleted successfully',
            statusCode: res.statusCode
        })))
        .catch(err => res.status(404).json({
            success: false,
            statusMessage: err.message,
            statusCode: res.statusCode
        }));
});

// @router DELETE api/gateways/gateway/device?id
// @desc   Delete a Gateway Device
// @access Private
router.delete('/gateway/device', async (req, res) => {

await Gateway.updateOne( 
    { _id: req.query.id }, 
    { $pull: { peripheral_devices: { uid: req.query.uid } } }
    // ,
    // { new: true }
    )
.then(item => {
    console.log(item)
    if (!item) return res.status(404).json({
        statusMessage: `Device with id ${req.query.uid} does not exist`
    })
    else if (item.nModified > 0) {
        res.json({
            success: true,
            statusMessage: 'Device deleted successfully',
            statusCode: res.statusCode
        })
    }
    else res.json({
    success: false,
    statusMessage: 'An Error Occured.',
    statusCode: res.statusCode
})}
)
.catch(err => 
    { 
    console.log(err)
    res.status(500).json({
    success: false,
    statusMessage: err.message,
    statusCode: res.statusCode
})
})
});

module.exports = router;