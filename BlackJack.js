//Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan' : "#your-blackjack-result", 'div': ".flex-box-your-box", 'score': 0, 'money' : 500},
    'dealer': {'scoreSpan' : "#dealer-blackjack-result", 'div': ".flex-box-computer-box", 'score': 0},
    'randomCard' : {
        0 : 'images/PNG/2C.png',
        1 : 'images/PNG/3C.png',
        2 : 'images/PNG/4C.png',
        3 : 'images/PNG/5C.png',
        4 : 'images/PNG/6C.png',
        5 : 'images/PNG/7C.png',
        6 : 'images/PNG/8C.png',
        7 : 'images/PNG/9C.png',
        8 : 'images/PNG/10C.png',
        9 : 'images/PNG/JC.png',
        10 : 'images/PNG/QC.png',
        11 : 'images/PNG/KC.png',
        12 : 'images/PNG/AC.png',
        13 : 'images/PNG/2D.png',
        14 : 'images/PNG/3D.png',
        15 : 'images/PNG/4D.png',
        16 : 'images/PNG/5D.png',
        17 : 'images/PNG/6D.png',
        18 : 'images/PNG/7D.png',
        19 : 'images/PNG/8D.png',
        20 : 'images/PNG/9D.png',
        21 : 'images/PNG/10D.png',
        22 : 'images/PNG/JD.png',
        23 : 'images/PNG/QD.png',
        24 : 'images/PNG/KD.png',
        25 : 'images/PNG/AD.png',
        26 : 'images/PNG/2H.png',
        27 : 'images/PNG/3H.png',
        28 : 'images/PNG/4H.png',
        29 : 'images/PNG/5H.png',
        30 : 'images/PNG/6H.png',
        31 : 'images/PNG/7H.png',
        32 : 'images/PNG/8H.png',
        33 : 'images/PNG/9H.png',
        34 : 'images/PNG/10H.png',
        35 : 'images/PNG/JH.png',
        36 : 'images/PNG/QH.png',
        37 : 'images/PNG/KH.png',
        38 : 'images/PNG/AH.png',
        39 : 'images/PNG/2S.png',
        40 : 'images/PNG/3S.png',
        41 : 'images/PNG/4S.png',
        42 : 'images/PNG/5S.png',
        43 : 'images/PNG/6S.png',
        44 : 'images/PNG/7S.png',
        45 : 'images/PNG/8S.png',
        46 : 'images/PNG/9S.png',
        47 : 'images/PNG/10S.png',
        48 : 'images/PNG/JS.png',
        49 : 'images/PNG/QS.png',
        50 : 'images/PNG/KS.png',
        51 : 'images/PNG/AS.png'
    },
    'CardsPoint' : {0 : 2, 1 : 3, 2 : 4, 3 : 5, 4 : 6, 5 : 7, 6 : 8, 7 : 9, 8 : 10, 9 : 10, 10 : 10, 11 : 10, 12 : [1, 11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'Stand' : true,
    'Hit' : true,
    'Deal' : false
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const RANDOMCARD = blackjackGame['randomCard']
const CARDSPOINT = blackjackGame['CardsPoint']

WINS = blackjackGame['wins'];
LOSSES = blackjackGame['losses'];
DRAWS = blackjackGame['draws'];

STAND = blackjackGame['Stand'];
HIT = blackjackGame['Hit'];
DEAL = blackjackGame['Deal'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');

InitialStart();

document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#stand').addEventListener('click', blackjackStand);
document.querySelector('#deal').addEventListener('click', blackjackDeal);


function InitialStart(){
    showCard(YOU);
    showScore(YOU);

    showCard(YOU);
    showScore(YOU);
}

function blackjackHit() {
    if(HIT == true){
        showCard(YOU);
        showScore(YOU);
        STAND = true;
    }
}

function showCard(activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');

        let card = randomCard();
        updateScore(card % 13, activePlayer);
        cardImage.src = RANDOMCARD[card];

        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function randomCard(){
    let randomCardChooser = Math.floor(Math.random() * 52);

    return randomCardChooser;
}

function blackjackDeal(){
    //uncomment for 2 player
    //let winner = DetermineWinner();
    //Message(winner);
    if(DEAL == true){
        let yourImages = document.querySelector('.flex-box-your-box').querySelectorAll('img');
        let computerImages = document.querySelector('.flex-box-computer-box').querySelectorAll('img');

        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }

        for(let i = 0; i < computerImages.length; i++){
            computerImages[i].remove();
        }

        YOU['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = "white";

        DEALER['score'] = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = "white";

        document.querySelector('#blackjack-result').textContent = "1 Round = $100";
        document.querySelector('#blackjack-result').style.color = "black";

        DEAL = false;
        HIT = true;
        STAND = true;

        InitialStart();
    }
}

function updateScore(randomCardChooser, activePlayer){
    if(randomCardChooser == 12 && activePlayer['score']  >= 11){
        randomCardChooser = CARDSPOINT[randomCardChooser][0];
        activePlayer['score'] += randomCardChooser;
    }
    else if(randomCardChooser == 12){
        randomCardChooser = CARDSPOINT[randomCardChooser][1];
        activePlayer['score'] += randomCardChooser;
    }
    else{
        activePlayer['score'] += blackjackGame['CardsPoint'][randomCardChooser];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } 
}

async function blackjackStand(){
    HIT = false;
    if(STAND == true){
        if(YOU['score'] <= 21){
            while((DEALER['score'] < YOU['score'] && YOU['score']  <= 21) || DEALER['score'] < 17){
                showCard(DEALER);
                showScore(DEALER);
                await sleep(1000);
            }
        }
        else if(YOU['score'] > 21){
            while(DEALER['score'] < 17){
                showCard(DEALER);
                showScore(DEALER);
                await sleep(1000);
            }
        }
        

        let winner = DetermineWinner();
        Message(winner);

        
        DEAL = true;
        STAND = false;
    }
}

function DetermineWinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log("winner");
            winner = YOU;
            WINS += 1;
        }
        else if(YOU['score'] == DEALER['score']){
            console.log("TIED");
            DRAWS += 1;
        }
        else{
            console.log("loser");
            winner = DEALER;
            LOSSES += 1;
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        console.log("loser");
        winner = DEALER;
        LOSSES += 1;
    }
    else{
        console.log("TIED");
        DRAWS += 1;
    }

    return winner;
}

function Message(winner){
    let message, messageColor;

    if(winner == YOU){
        message = "YOU WON!!!";
        winSound.play()
        messageColor = 'green';
    }
    else if(winner == DEALER){
        message = "YOU LOST!!!";
        loseSound.play();
        messageColor = 'red';
    }
    else {
        message = "YOU TIED!!!";
        messageColor = 'black';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;

    tableResults();
    updateMoney(winner);
    showMoney();
}

function tableResults(){
    document.querySelector('#wins').textContent = WINS;
    document.querySelector('#wins').style.color = 'green';

    document.querySelector('#losses').textContent = LOSSES;
    document.querySelector('#losses').style.color = 'red';

    document.querySelector('#draws').textContent = DRAWS;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateMoney(winner){
    //let bet = 0;
    if(winner == YOU && YOU['score'] == 21){
        YOU['money'] += 150;
    }
    else if(winner == DEALER){
        YOU['money'] -= 100;
    }
    else if(winner == YOU){
        YOU['money'] += 100;
    }
}

function showMoney(){
    document.querySelector("#money").textContent = YOU['money'];
}






