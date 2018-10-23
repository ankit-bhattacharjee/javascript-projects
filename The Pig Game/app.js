/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Global Variables
var scores, roundScore, activePlayer, previousDiceRoll, gamePlaying, goal;
init();


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousDiceRoll = [0, 0];
    gamePlaying = true;
    goal = 25;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.goal').style.display = 'block';
    
}

// Add Listener to Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        var dice = Math.ceil(Math.random() * 6);
        if(dice === 6 && previousDiceRoll[activePlayer] === dice){
            // Reset Global Score to 0
             scores[activePlayer] = 0;
             document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
             nextPlayer();
        }
        else{
             // Display Dice
             var diceDOM = document.querySelector('.dice');
             diceDOM.src = 'dice-' + dice + '.png';
             diceDOM.style.display = 'block';
             // Add Round Score
             if(dice === 1){
                // Round Score Reset, Give Control
                nextPlayer();
             }
             else{
                 roundScore += dice;
                 document.getElementById('current-' + activePlayer).textContent = roundScore;
             }
             previousDiceRoll[activePlayer] = dice;
        }
    }
});

// Add Listener to Hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Win condition
        hideGoal();
        console.log('Current goal : '+goal);
        if(scores[activePlayer] >=goal){
            document.getElementById('name-' +activePlayer).textContent = 'Winner!'
            document.getElementById('current-' + activePlayer).textContent = 0;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
            hideGoal();
        }
        else{
            nextPlayer();
        }
    }
});

//Add Listener to New
document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer(){
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' +activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

function hideGoal(){
    if(gamePlaying){
        var newGoal = document.querySelector('.goal').value;
        if(newGoal){
             goal = newGoal;
        }
        console.log(goal);
    }
    document.querySelector('.goal').style.display = 'none';
}