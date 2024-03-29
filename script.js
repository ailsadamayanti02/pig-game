
/*
-permainan ini memiliki 2 pemain, bermain dalam ronde
- di setiap giliran, seorang pemain melempar dadu sebanyak yang diinginkan, Setiap hasil ditambahkan ke skor RUNDING-nya
- Tetapi, jika pemain melempar angka 1, semua skor RUNDING-nya akan hilang. Setelah itu, giliran pemain berikutnya, giliran pemain berikutnya
- pemain pertama yang mencapai 100 poin pada skor GLOBAL memenangkan permainan
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function () {
      if (gamePlaying) {
            // 1. random number
            var dice = Math.floor(Math.random() * 6) + 1;

            // 2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            //3 update the round score IF the called number was NOT 
            if (dice !== 1) {
                  //add score
                  roundScore += dice; //roundScore = roundScore + dice;
                  document.querySelector('#current--' + activePlayer).textContent = roundScore;

            } else {
                  //next player
                  nextPlayer();
            }

      }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
      if (gamePlaying) {
            // add current score to global score
            scores[activePlayer] += roundScore;       //scores[activePlayer] = scores[activePlayer] + roundScore;


            // update the UI
            document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

            // check if player won the game
            if (scores[activePlayer] >= 20) {
                  document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
                  document.querySelector('.dice').style.display = 'none';
                  document.querySelector('.player-' + activePlayer + '-panel').classList.add('player--winner');
                  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('player--active');
                  gamePlaying = false;

            } else {
                  //next player
                  nextPlayer();
            }
      }
});

function nextPlayer() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;

      document.getElementById('current--0').textContent = '0';
      document.getElementById('current--1').textContent = '0';

      document.querySelector('.player-0-panel').classList.toggle('player--active');
      document.querySelector('.player-1-panel').classList.toggle('player--active');

      //document.querySelector('.player--0').classList.remove('player--active');
      //document.querySelector('.player--1').classList.add('player--active');

      document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
      scores = [0, 0];
      activePlayer = 0;
      roundScore = 0;
      gamePlaying = true;

      document.querySelector('.dice').style.display = 'none';

      document.getElementById('score--0').textContent = '0';
      document.getElementById('score--1').textContent = '0';
      document.getElementById('current--0').textContent = '0';
      document.getElementById('current--1').textContent = '0';
      document.getElementById('name--0').textContent = 'Player 1';
      document.getElementById('name--1').textContent = 'Player 2';
      document.querySelector('.player-0-panel').classList.remove('player--winner');
      document.querySelector('.player-1-panel').classList.remove('player--winner');
      document.querySelector('.player-0-panel').classList.remove('player--active');
      document.querySelector('.player-1-panel').classList.remove('player--winner');
      document.querySelector('.player-0-panel').classList.add('player--active');

}

//dice = Math.floor(Math.random() * 6) + 1;
//document.querySelector('#current--' + activePlayer).textContent = dice;
//document.querySelector('current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score--0').textContent;