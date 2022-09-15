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

            const gameId = game._id.toString()

            console.log(`new game has been created: ${game} with id of: ${gameId}`)
            res.send(game)
            res.redirect(`/game/playerTurn/${gameId}`)
            
        } catch (err) {
            console.log(err)
        }
    },
    playerTurn: async (req, res) => {
        const gameId = req.params._id
        const playerNum = req.params.playerNum
        console.log(`game id from params: ${gameId}`)
        console.log(`player num from params: ${playerNum}`)
        try {
            const game = await Game.findById(
                {'_id': gameId}
            )
            console.log('inside playerTurn game controller')

            if (playerNum == 'playerOne') {
                res.render("playerTurn.ejs", {player: game.playerOne, gameId: game._id, playerNum: 'playerOne'})
            } else {
            res.render("playerTurn.ejs", {player: game.playerTwo, gameId: game._id, playerNum: 'playerTwo'})
            }
        } catch (err) {
            console.log(err)
        }
        
    },
    endTurn: async (req, res) => {
        const gameId = req.params._id
        const playerNum = req.params.playerNum

        if (playerNum == 'playerOne') {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerOne.stackCards': {'$each': req.body.stackCards},
                            'playerOne.cardsDrawn': req.body.cardsDrawn
                        }
                    }
                )
                console.log(response)
                res.redirect(`/game/playerTurn/${gameId}/playerTwo`)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerTwo.stackCards': {'$each': req.body.stackCards},
                            'playerTwo.cardsDrawn': req.body.cardsDrawn
                        }
                    }
                )
                console.log(response)
                res.redirect(`/game/playerTurn/${gameId}/playerOne`)
            } catch (err) {
                console.log(err)
            }
        }
    },
    endGame: async (req, res) => {
        const gameId = req.params._id
        const playerNum = req.params.playerNum

        if (playerNum == 'playerOne') {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerOne.stackCards': {'$each': req.body.stackCards},
                            'playerOne.cardsDrawn': req.body.cardsDrawn
                        },
                        '$set': {
                            'playerOne.winner': true
                        }
                    }
                )
                console.log(response)
                res.redirect(`/game/remainingStackCards/${gameId}/playerTwo`)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerTwo.stackCards': {'$each': req.body.stackCards},
                            'playerTwo.cardsDrawn': req.body.cardsDrawn
                        },
                        '$set': {
                            'playerTwo.winner': true
                        }
                    }
                )
                console.log(response)
                res.redirect(`/game/remainingStackCards/${gameId}/playerOne`)
            } catch (err) {
                console.log(err)
            }
        }
    },
    getRemainingStackCards: async (req, res) => {
        const gameId = req.params._id
        const playerNum = req.params.playerNum
        console.log(`game id from params: ${gameId}`)
        console.log(`player num from params: ${playerNum}`)
        try {
            const game = await Game.findById(
                {'_id': gameId}
            )
            console.log('inside playerTurn game controller')

            if (playerNum == 'playerOne') {
                res.render("endGame.ejs", {player: game.playerOne, gameId: game._id, playerNum: 'playerOne'})
            } else {
            res.render("endGame.ejs", {player: game.playerTwo, gameId: game._id, playerNum: 'playerTwo'})
            }
        } catch (err) {
            console.log(err)
        }
    },
    putRemainingStackCards: async (req, res) => {
        const gameId = req.params._id
        const playerNum = req.params.playerNum

        if (playerNum == 'playerOne') {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerOne.stackCards': {'$each': req.body.stackCards},
                        }
                    }
                )
                console.log(response)
                res.redirect(`/main/`)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await Game.findByIdAndUpdate(
                    {'_id': gameId},
                    {
                        '$push': {
                            'playerTwo.stackCards': {'$each': req.body.stackCards},
                        }
                    }
                )
                console.log(response)
                res.redirect(`/main/`)
            } catch (err) {
                console.log(err)
            }
        }
    }
}


