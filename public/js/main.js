
// Game set up

// document.querySelector('.submitPlayerValues').addEventListener('click', createGame)

let playerOneName
let playerTwoName
let playerOneCard
let playerTwoCard

function determinePlayerOrder() {

    playerOneName = document.querySelector('.playerOneName').value
    playerTwoName = document.querySelector('.playerTwoName').value
    playerOneCard = document.querySelector('input[name="playerOneCard"]:checked').value
    playerTwoCard = document.querySelector('input[name="playerTwoCard"]:checked').value

    // if first player has lower card than second, player order and values will be swapped
    if (Number(playerOneCard) < Number(playerTwoCard)) {
        let tempName = playerTwoName
        playerTwoName = playerOneName
        playerOneName = tempName

        let tempCard = playerTwoCard
        playerTwoCard = playerOneCard
        playerOneCard = tempCard
    }
}

async function createGame() {
    
    determinePlayerOrder()

    try {
        const response = await fetch('game/createGame', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'playerOneName': playerOneName,
                'playerOneCard': playerOneCard,
                'playerTwoName': playerTwoName,
                'playerTwoCard': playerTwoCard
            })
        })
        const data = response.json()
        console.log(data)

        gameId = data._id

    } catch (err) {
        console.log(err)
    }
}

async function newStackCardPLayerOne() {
    try {
        const response = await fetch('game/newStackCardPLayerOne/631ab57639eb55687e38c3c5', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCard': '8'
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

async function newStackCardPLayerTwo() {
    try {
        const response = await fetch('game/newStackCardPLayerTwo/631ab57639eb55687e38c3c5', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCard': '8'
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

async function cardsDrawnPLayerOne() {
    try {
        const response = await fetch('game/cardsDrawnPLayerOne/631ab57639eb55687e38c3c5', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'cardsDrawn': '3'
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

async function cardsDrawnPLayerTwo() {
    try {
        const response = await fetch('game/cardsDrawnPLayerTwo/631ab57639eb55687e38c3c5', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'cardsDrawn': '3'
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}



//player turn functions
document.querySelector('.endTurn').addEventListener('click', endTurn)

//cards drawn selectors and functions
document.querySelector('.addFive').addEventListener('click', addFive)
const cardDrawRadios = document.querySelectorAll('input[name="cardsDrawn"]')
for (let radio of cardDrawRadios) {
    radio.onclick = (e) => {
        console.log(e.target.value)
        document.querySelector('.numDrawnCards').innerHTML = e.target.value
    }
}

function addFive() {
    let currentNum = Number(document.querySelector('.numDrawnCards').innerHTML)
    currentNum += 5
    document.querySelector('.numDrawnCards').innerHTML = currentNum
}

//stack cards selectors
let stackCardArray = []
const stackCardRadios = document.querySelectorAll('input[name="stackCard"]')
for (let radio of stackCardRadios) {
    radio.onclick = (e) => {
        stackCardArray.push(e.target.value)
        document.querySelector('.newStackCard').innerHTML = e.target.value
        console.log(stackCardArray)
    }
}

async function endTurn() {
    let cardsDrawn = document.querySelector('.numDrawnCards').innerHTML
    console.log(`total cards drawn: ${cardsDrawn} and stack card array: ${stackCardArray}`)
    try {
        const response = await fetch('/game/playerOneEndTurn/6320ca61be1e6ac066f420b5', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCards': stackCardArray,
                'cardsDrawn': cardsDrawn
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}










//following functions for use if using Player model
async function addPlayer(playerName, stackCard) {
    console.log('inside addPlayer main.js')
    try {
        const response = await fetch('players/addPlayer', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'name': playerName,
                'stackCard': stackCard
            })
        })
        const data = response.json()
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

async function submitCardDrawAmount() {
    try {
        const response = await fetch('players/submitCardDrawAmount/6319153597ed02f4f3a6eec4', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'cardDrawAmount': '2'
            })
        })
    } catch (err) {
        console.log(err)
    }
}

async function addRemainingStackCards() {
    const testArr = ["k", "1", "3"]
    try {
        console.log(`in main.js trying to add ${testArr}`)
        const response = await fetch('players/addRemainingStackCards/6319153597ed02f4f3a6eec4', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "stackCard": testArr
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}


//need to figure out how to nest documents. currently Game.js is not able to find Player.js
async function startGame() {
    try {
        const playerOne = await addPlayer()
        const playerTwo = await addPlayer()
        const response = await fetch('game/createGame', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'playerOne': playerOne,
                'playerTwo': playerTwo
            })
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}


//figure out why stack card array is adding 'null'


