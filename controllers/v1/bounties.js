// Create router and reference the models
let router = require('express').Router()

// GET /bounties - Retrieve all bounties in the DB
router.get('/', (req, res) => {
    res.send('TBD - get the bounties')
})

// Export the router object and the routes attached to it
module.exports = router