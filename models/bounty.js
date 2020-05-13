//Require mongoose
let mongoose = require('mongoose')

//Make the schema for bounty
let bountySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        unique: true
    },
    wantedFor: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    ship: String,
    lastseen: String,
    hunters: Array,
    reward: {
        type: Number,
        default: 10000
    },
    captured: {
        type: Boolean,
        default: false
    }
})

// Create + export the model 
module.exports = mongoose.model('Bounty', bountySchema)
