const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stackCards: {
        type: [String],
        required: true
    },
    cardDrawAmount: {
        type: [Number],
        required: true
   },
   winner: {
    type: Boolean,
    default: false,
    required: true
   }
})

module.exports = mongoose.model('Player', playerSchema)