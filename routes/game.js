const express = require('express')
const router = express.Router()
const gameController = require('../controllers/game')

router.post('/createGame', gameController.createGame)

router.get('/playerTurn/:_id/:playerNum', gameController.playerTurn)

router.get('/getRemainingStackCards/:_id/:playerNum', gameController.getRemainingStackCards)

router.put('/endTurn/:_id/:playerNum', gameController.endTurn)

router.put('/endGame/:_id/:playerNum', gameController.endGame)

router.put('/putRemainingStackCards/:_id/:playerNum', gameController.putRemainingStackCards)



module.exports = router