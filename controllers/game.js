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
            res.redirect(`/game/playerOneTurn/${game._id}`)
            
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
    playerOneTurn: async (req, res) => {
        try {
            const game = await Game.findById(
                {'_id': req.params._id}
            )
            console.log('inside playerTurn game controller')
            res.render("playerOneTurn.ejs", {playerOne: game.playerOne})
        } catch (err) {
            console.log(err)
        }
        
    },
    playerOneEndTurn: async (req, res) => {
        try {
            const response = await Game.findByIdAndUpdate(
                {'_id': req.params._id},
                {
                    '$push': {
                        'playerOne.stackCards': {'$each': req.body.stackCards},
                        'playerOne.cardsDrawn': req.body.cardsDrawn
                    }
                }
            )
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
}



// /playerTurn/:_id/:number