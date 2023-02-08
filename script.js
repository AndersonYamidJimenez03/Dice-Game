const totalValue = document.querySelectorAll('.total');
const currValue = document.querySelectorAll('.curr');

const btnNewGame = document.querySelector('.btnNewGame');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');

const dice = document.querySelector('.diceImg');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');


// VARIABLES
const total = [0, 0];
const curr = [0, 0];
let currPlayer;


// INITIAL FUNCTION (PAR DEFAULT)// 
const init = function(){
    currPlayer = 0;

    total.fill(0);
    curr.fill(0);

    totalValue[0].textContent = total[0];
    totalValue[1].textContent = total[1];
    currValue[0].textContent = curr[0];
    currValue[1].textContent = curr[1];

    left.classList.add('playerContainer');
    
    right.classList.remove('playerContainer');

    dice.classList.add('hidden');
}

init();


// CHANGE OF PLAYER
const nextPlayerFn= function(){

    currPlayer = currPlayer === 0 ? 1 : 0;

    left.classList.toggle('playerContainer');
    right.classList.toggle('playerContainer');

}

// TAKES THE REQUEST FOR ROLL THE DICE
btnRoll.addEventListener('click', function(){
    
    const secretNumber = Math.trunc((Math.random() * 6)) + 1;

    dice.classList.remove('hidden');

    dice.setAttribute('src', `./img/dice-${secretNumber}.png`);


    if(secretNumber === 1){
        cleanPlayerCurr();
        nextPlayerFn(); 
    }else{
        curr[currPlayer] += secretNumber;
        currValue[currPlayer].textContent = curr[currPlayer];

    }

})

// IT ADDS THE CURRENT VALUE TO THE TOTAL AND PASS PLAYER
btnHold.addEventListener('click', function(){
     
    total[currPlayer] += curr[currPlayer];

    totalValue[currPlayer].textContent = total[currPlayer];


    if(total[currPlayer] > 15){
        
        modal.classList.remove('back');
        overlay.classList.remove('back');

    }else{
        cleanPlayerCurr();
        nextPlayerFn(); 
    }

})

//CLEAN THE CURRENTS' DATA
const cleanPlayerCurr = function(){

    curr[currPlayer] = 0;

    currValue[currPlayer].textContent = curr[currPlayer];
}

// RE-START GAME
btnNewGame.addEventListener('click', init);

// OVERLAY AND MODEL FOR DISPLAYING THE WINNER
const close = function(){
    modal.classList.add('back');
    overlay.classList.add('back');
}

document.querySelector('.cancelModal').addEventListener('click', function(){
    modal.classList.add('back');
    overlay.classList.add('back');
})


document.addEventListener('keydown', function(e){

if(e.key === 'Escape' && 
!modal.classList.contains('back')) {close()};

})

