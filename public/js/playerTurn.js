
//player turn Functions

document.querySelector('.endTurn').addEventListener('click', endTurn)
document.querySelector('.endGame').addEventListener('click', endGame)

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
    let gameId = document.querySelector('.gameId').innerHTML
    let player = document.querySelector('.player').innerHTML
    console.log(gameId)
    console.log(`total cards drawn: ${cardsDrawn} and stack card array: ${stackCardArray}`)
    try {
        const response = await fetch(`/game/endTurn/${gameId}/${player}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCards': stackCardArray,
                'cardsDrawn': cardsDrawn
            })
        })
        console.log(response)
        
        if (player == 'playerOne') {
            location.assign(`/game/playerTurn/${gameId}/playerTwo`)
        } else {
            location.assign(`/game/playerTurn/${gameId}/playerOne`)
        }        
    } catch (err) {
        console.log(err)
    }
}

async function endGame() {
    let cardsDrawn = document.querySelector('.numDrawnCards').innerHTML
    let gameId = document.querySelector('.gameId').innerHTML
    let player = document.querySelector('.player').innerHTML
    console.log(gameId)
    console.log(`total cards drawn: ${cardsDrawn} and stack card array: ${stackCardArray}`)
    try {
        const response = await fetch(`/game/endTurn/${gameId}/${player}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCards': stackCardArray,
                'cardsDrawn': cardsDrawn
            })
        })
        console.log(response)
        
        if (player == 'playerOne') {
            location.assign(`/game/getRemainingStackCards/${gameId}/playerTwo`)
        } else {
            location.assign(`/game/getRemainingStackCards/${gameId}/playerOne`)
        }        
    } catch (err) {
        console.log(err)
    }
}