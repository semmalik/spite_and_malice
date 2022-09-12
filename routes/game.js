const express = require('express')
const router = express.Router()
const gameController = require('../controllers/game')

router.get('/playerTurn', gameController.playerTurn)

router.post('/createGame', gameController.createGame)

router.put('/newStackCardPLayerOne/:_id', gameController.newStackCardPLayerOne)
router.put('/newStackCardPLayerTwo/:_id', gameController.newStackCardPLayerTwo)

router.put('/cardsDrawnPLayerOne/:_id', gameController.cardsDrawnPLayerOne)
router.put('/cardsDrawnPLayerTwo/:_id', gameController.cardsDrawnPLayerTwo)


module.exports = router