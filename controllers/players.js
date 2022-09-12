const Player = require('../models/Player')

module.exports = {
    addPlayer: async (req, res) => {
        try {
            const newPlayer = await Player.create({
                name: req.body.name,
                stackCards: [],
                cardDrawNumber: [],
                winner: false
            })
            console.log('player created!')
            res.send(newPlayer)
        } catch (err) {
            console.log(err)
        }
    },
    newStackCard: async (req, res) => {
        const playerId = req.params._id
        try {
            const player = await Player.findByIdAndUpdate(
                {'_id': playerId},
                {
                    '$push': {
                        'stackCards': req.body.stackCard
                    }
                }
            )
            console.log(`${player.name} has added new stack card: ${req.body.stackCard}`)
        } catch (err) {
            console.log(err)
        }
    },
    submitCardDrawAmount: async (req, res) => {
        const playerId = req.params._id
        try {
            const player = await Player.findByIdAndUpdate(
                {'_id': playerId},
                {
                    '$push': {
                        'cardDrawAmount': req.body.cardDrawAmount
                    }
                }
            )
            console.log(`${player.name} has draw cards: ${req.body.cardDrawAmount}`)
        } catch (err) {
            console.log(err)
        }
    },
    addRemainingStackCards: async (req, res) => {
        const playerId = req.params._id
        const testArr = req.body.stackCards
        console.log(`>>>>>>>>>>>>>>>>in players controller trying to add ${req.body.stackCard}`)
        console.log(`>>>>>>>>>>>>>>>> type: ${typeof(req.body.stackCard)}`)

        const arr = Object.values(req.body.stackCard[0])
        

        console.log(`type of: ${typeof(arr)}${arr}`)


        try {
            const player = await Player.findByIdAndUpdate(
                {'_id': playerId},
                {
                    '$push': {
                        'stackCard': {'$each': arr}
                    }
                }
            )
            console.log(`added remaing stack cards to ${player}'s stack`)
        } catch (err) {
            console.log(err)
        }
    },
    declareWinner: async (req, res) => {
        const playerId = req.params._id
        try {
            const player = await Player.findByIdAndUpdate(
                {'_id': playerId},
                {
                    '$set': {
                        'winner': true
                    }
                }
            )
            console.log(`${player.name} is the winner!`)
        } catch (err) {
            console.log(err)
        }
    }
}