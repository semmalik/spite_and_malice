
// Game set up

const gameSubmit = document.querySelector('.submitPlayerValues')

if (gameSubmit != null) {
    gameSubmit.addEventListener('click', createGame)
}

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
        const data = await response.json()
        console.log(`data received: ${data}`)
        console.log(data._id)

        location.assign(`/game/playerTurn/${data._id}/playerOne`)

    } catch (err) {
        console.log(err)
    }
}