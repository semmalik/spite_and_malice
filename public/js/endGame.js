
//Ending game functions
document.querySelector('.addCards').addEventListener('click', addRemainingStackCards)

const remainingCardsRadios = document.querySelectorAll('input[name="remainingCards"]')
for (let radio of remainingCardsRadios) {
    radio.onclick = (e) => {
        console.log(e.target.value)
        document.querySelector('.remainingCards').innerHTML = e.target.value
    }
}



async function addRemainingStackCards() {
    let gameId = document.querySelector('.gameId').innerHTML
    let player = document.querySelector('.player').innerHTML
    let remainingCards = document.querySelector('.remainingCards').innerHTML
    try {
        const response = await fetch(`/game/putRemainingStackCards/${gameId}/${player}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'remainingCards': remainingCards,
            })
        })
        console.log(response)
        location.assign('/')             
    } catch (err) {
        console.log(err)
    }
}

