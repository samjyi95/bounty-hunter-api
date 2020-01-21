// Require mongoose
let mongoose = require('mongoose')

// Provide a mongo connection string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hunters')

// Export all the other mongoose models in the models folder
module.exports.Bounty = require('./bounty')
// module.exports.Hunter = require('./hunter') // If we had a hunter model, e.g.