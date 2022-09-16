const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    playerOne: {
        name: {
            type: String,
            required: true,
            default: 'playerOne'
        },
        stackCards: {
            type: [String]
        },
        cardsDrawn: {
            type: [String]
        },
        remainingCards: {
            type: String,
            default: 0
        },
        winner: {
            type: Boolean,
            default: false
        }
    },
    playerTwo: {
        name: {
            type: String,
            required: true,
            default: 'playerTwo'
        },
        stackCards: {
            type: [String]
        },
        cardsDrawn: {
            type: [String]
        },
        remainingCards: {
            type: String,
            default: 0
        },
        winner: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model('Game', gameSchema)