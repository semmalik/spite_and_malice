const Game = require('../models/Game')

module.exports = {
    createGame: async (req, res) => {
        console.log('inside createGame in controller')
        try {
            const game = await Game.create({
                'playerOne': {
                    'name': req.body.playerOneName,
                    'stackCards': req.body.playerOneCard
                },
                'playerTwo': {
                    'name': req.body.playerTwoName,
                    'stackCards': req.body.playerTwoCard
                }
            })

            console.log(`new game has been created: ${game}`)
            // res.send(game)
            res.render("playerTurn.ejs")
        } catch (err) {
            console.log(err)
        }
    },
    newStackCardPLayerOne: async (req, res) => {
        console.log('inside playerOne stack card controller')
        const gameId = req.params._id
        try {
            await Game.findByIdAndUpdate(
                {'_id': gameId},
                {
                    '$push': {
                        'playerOne.stackCards': req.body.stackCard
                    }
                }
            )
            console.log(`${gameId} has added new stack card to playerOne: ${req.body.stackCard}`)
        } catch (err) {
            console.log(err)
        }
    },
    newStackCardPLayerTwo: async (req, res) => {
        const gameId = req.params._id
        try {
            await Game.findByIdAndUpdate(
                {'_id': gameId},
                {
                    '$push': {
                        'playerTwo.stackCards': req.body.stackCard
                    }
                }
            )
            console.log(`${gameId} has added new stack card to playerTwo: ${req.body.stackCard}`)
        } catch (err) {
            console.log(err)
        }
    },
    cardsDrawnPLayerOne: async (req, res) => {
        const gameId = req.params._id
        try {
            await Game.findByIdAndUpdate(
                {'_id': gameId},
                {
                    '$push': {
                        'playerOne.cardsDrawn': req.body.cardsDrawn
                    }
                }
            )
            console.log(`${gameId} playerOne has drawn cards: ${req.body.cardsDrawn}`)
        } catch (err) {
            console.log(err)
        }
    },
    cardsDrawnPLayerTwo: async (req, res) => {
        const gameId = req.params._id
        try {
            await Game.findByIdAndUpdate(
                {'_id': gameId},
                {
                    '$push': {
                        'playerTwo.cardsDrawn': req.body.cardsDrawn
                    }
                }
            )
            console.log(`${gameId} playerTwo has drawn cards: ${req.body.cardsDrawn}`)
        } catch (err) {
            console.log(err)
        }
    },
    playerTurn: (req, res) => {
        console.log('inside playerTurn game controller')
        res.send("playerTurn.ejs")
    }
}





// playerOne: {
//     name: {
//         type: String,
//         required: true,
//         default: playerOne
//     },
//     stackCards: {
//         type: [String]
//     },
//     cardDrawAmount: {
//         type: [Number]
//     },
//     winner: {
//         type: Boolean,
//         default: false
//     }