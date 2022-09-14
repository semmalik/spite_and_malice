
//Ending game functions

let remainingCards = []
const remainingStackCardRadios = document.querySelectorAll('input[name="remainingStackCard"]')
for (let radio of remainingStackCardRadios) {
    radio.onclick = (e) => {
        remainingCards.push(e.target.value)
        document.querySelector('.remainingCards').innerHTML += " " + e.target.value
        console.log(remainingCards)
    }
}

document.querySelector('.addCards').addEventListener('click', addRemainingStackCards)

async function addRemainingStackCards() {
    let gameId = document.querySelector('.gameId').innerHTML
    let player = document.querySelector('.player').innerHTML
    console.log(gameId)
    try {
        const response = await fetch(`/game/endTurn/${gameId}/${player}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'stackCards': remainingCards,
            })
        })
        console.log(response)
        
        location.assign('/')
               
    } catch (err) {
        console.log(err)
    }
}
