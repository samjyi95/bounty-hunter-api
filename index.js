// Require the node modules needed
let express = require('express')

// Create an app instance
let app = express()

// Set up middleware needed
// TODO: body-parser, cors

// Include any controllers we have
// TODO!

// Define a catch-all route (AKA 404)
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Listen on the specified PORT
app.listen(process.env.PORT || 3000)
