// constants


// app's state (variables) 
let score, bet, cash, betSet, spinClicked
let value = []
let initialized = 0


// cached element references
const gameMessage = document.querySelector('h2')
let displayEl1 = document.getElementById('screen-1')
let displayEl2 = document.getElementById('screen-2')
let displayEl3 = document.getElementById('screen-3')

const scoreEl = document.getElementById('game-score')
const cashEl = document.getElementById('game-cash')
const betEl = document.getElementById('gameBet')


//event listeners
document.getElementById('spin').addEventListener('click', playerSpin)
document.getElementById('bet5').addEventListener('click', playerBet5)
document.getElementById('bet10').addEventListener('click', playerBet10)


//functions
render()

function render() {
    if (initialized === 0) {
        initialize()
    }

    scoreEl.innerHTML = score
    cashEl.innerHTML = cash
    betEl.innerHTML = bet

    if (!betSet || bet === 0 ) {
        gameMessage.textContent = "Place your bets and spin"
    } 

}

function playerSpin(evt) {
    let clk = evt.target
    if (clk.localName !== 'button') {
        return
    }
    if (clk.id === 'bet5' || clk.id === 'bet10') {
        return
    } 
    if (!spinClicked) {
        spinClicked = true
        getValues()
    }
}

function gamePlay() {
    
    // check for cash before game play
    if (cash < 0) {
        gameMessage.textContent = "Out of cash! Reload game"
        spinClicked = false
        return
    } else {
        if (value[0] ===  7 &&  value[1] ===  7 && value[2] === 7) {
            cash = cash + (bet * 1000)
            score = score + 10000
            gameMessage.textContent = "Jackpot! You're a Winner"
        } else if (value[0] ===  value[1] &&  value[1] ===  value[2]) {
            cash = cash + (bet * 2)
            score = score + 500
            gameMessage.textContent = "Great! three out of three, Spin again."
        } else if (value[0] === value[1] && value[1] !== value[2]) {
            cash = cash + (bet * 1.5)
            score = score + 200
            gameMessage.textContent = "Great! two out of three, Spin again."
        } else if (value[0] !== value[1] && value[1] === value[2]) {
            cash = cash + (bet * 1.5)
            score = score + 200
            gameMessage.textContent = "Great! two out of three, Spin again."
        } else if (value[0] !== value[1] && value[0] === value[2]) {
            cash = cash + (bet * 1.5)
            score = score + 200
            gameMessage.textContent = "Great! two out of three, Spin again."
        } else {
            cash = cash - bet
            score = score - 100
            gameMessage.textContent = "Three different values"
        }
        spinClicked = false
        updateDisplay()
    }

}

function playerBet5(event) {
    let clk = event.target
    if (clk.localName !== 'button') {
        return
    }
    if (clk.id === 'spin') {
        return
    }
    if (!betSet) {
        bet = 5
        betSet = true
    } else {
        bet = bet + 5
    }
    cash = (cash -  5)
    gameMessage.textContent = "Click Spin"
    updateDisplay()
}

function playerBet10(e) {
    let clk = e.target
    if (clk.localName !== 'button') {
        return
    }
    if (clk.id === 'spin') {
        return
    }
    if (!betSet) {
        bet = 10
        betSet = true
    } else {
        bet = bet + 10
    }
    cash = (cash -  10)
    gameMessage.textContent = "Click Spin"
    updateDisplay()
}

function randomValue() {
    return Math.floor(Math.random() * 7 + 1)
}

function getValues() {
    if (!betSet) {
        gameMessage.textContent = "Place your bets before spinning"
        spinClicked = false
        return
    } else {
        value[0] = randomValue()
        value[1] = randomValue()
        value[2] = randomValue()
        gamePlay()
    }
}

function updateDisplay() {
    displayEl1.innerHTML = value[0]
    displayEl2.innerHTML = value[1]
    displayEl3.innerHTML = value[2]
    render()
}

//Upon loading initialize slot machine game for different values
function initialize() {
    value[0] = randomValue()
    value[1] = randomValue()
    value[2] = randomValue()
    if (value[0] ===  value[1] &&  value[0] ===  value[2]) {
        initialize()
    } else {
        score = 0
        cash = 200
        bet = 0
        betSet = false
        spinClicked = false
        initialized = 1
    }
    updateDisplay()
}