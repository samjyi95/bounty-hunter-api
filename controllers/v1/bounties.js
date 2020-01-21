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
        console.log('Error in GET /bounties', err)
        res.status(503).send({ message: 'Database asleep?' })
    })
})

// POST /v1/bounties - Create a new bounty
router.post('/', (req, res) => {
    db.Bounty.create(req.body)
    .then(newBounty => {
        res.status(201).send(newBounty)
    })
    .catch(err => {
        console.log('Error when posting to /bounties', err)
        if (err.name === 'ValidationError') {
            res.status(406).send({ message: 'Validation Error' })
        }
        else {
            res.status(503).send({ message: 'Database or Server Error' })
        }
    })
})

// PUT /v1/bounties - Bulk update bounties
router.put('/', (req, res) => {
    res.send('TBD - update all the bounties')
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/', (req, res) => {
    db.Bounty.deleteMany()
    .then(() => {
        res.status(204).send()
    })
    .catch(err => {
        console.log('Error in delete all route', err)
        res.status(503).send({ message: 'Server-side error' })
    })
})

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id', (req, res) => {
    db.Bounty.findById(req.params.id)
    .then(bounty => {
        if (bounty) {
            res.send(bounty)
        }
        else {
            res.status(404).send({ message: 'Resource not located' })
        }
    })
    .catch(err => {
        console.log('Error in GET /bounties/:id', err)
        res.status(503).send({ message: 'Service unavailable' })
    })
})

// PUT /v1/bounties/:id - Update a single bounty
router.put('/:id', (req, res) => {
    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedBounty => {
        res.send(updatedBounty)
    })
    .catch(err => {
        console.log('Error in PUT /bounties/:id', err)
        res.status(503).send({ message: 'Server-side error' })
    })
})

// DELETE /v1/bounties/:id - Delete a single bounty
router.delete('/:id', (req, res) => {
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(err => {
        console.log('Error when deleting ONE bounty', err)
        res.status(503).send({ message: 'Server-side error' })
    })
})

// Export the router object and the routes attached to it
module.exports = router