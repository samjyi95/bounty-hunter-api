// Create router and reference the models
let db = require('../../models')
let router = require('express').Router()

// GET /v1/bounties - Retrieve all bounties in the DB
router.get('/', (req, res) => {
    db.Bounty.find()
    .then(bounties => {
        res.send(bounties)
    })
    .catch(err => {
        console.log("Error in index route", err)
        res.status(500).send({ message: 'Oops?' })
    })
})

// POST /v1/bounties - Create a new bounty
router.post('/', (req,res) => {
    db.Bounty.create(req.body)
    .then(newBounty => {
        res.status(201).send(newBounty)
    })
    .catch(err => {
        console.log('Error creating a Bounty', err)
        if(err.name == 'ValidationError') {
            res.status(406).send({ message: 'Validation Error' })
        }
        else {
            res.status(503).send({ message: 'Server or Database Error' })
        }
    })
})

// PUT /v1/bounties - Bulk update bounties
// TODO: LAB
router.put('/updateAll', (req, res) => {
    db.Bounty.updateMany({},
    req.body,
    {multi: true}
    )
    .then 
})

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id', (req, res) => {
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(() => {
        res.send('Delete was successful')
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: 'Oh Boy' })
    })
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/', (req, res) => {
    db.Bounty.deleteMany()
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log(err, 'U thot')
    })
})

// PUT /v1/bounties/:id - Update a single bounty
// TODO: LAB

// DELETE /v1/bounties/:id - Delete a single bounty
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.Bounty.findByIdAndDelete(id)
    .then(Bounty => {
        res.send(Bounty)
    })
    .catch(err => {
        res.send('well that didnt work..')
    })
})

// Export the router object and the routes attached to it
module.exports = router
