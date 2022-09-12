const express = require('express')
const router = express.Router()
const playersController = require('../controllers/players')

router.post('/addPlayer', playersController.addPlayer)
router.put('/addNewStackCard/:_id', playersController.newStackCard)
router.put('/submitCardDrawAmount/:_id', playersController.submitCardDrawAmount)
router.put('/addRemainingStackCards/:_id', playersController.addRemainingStackCards)

module.exports = router