/*
1. Seorang pemain kehilangan SELURUH skornya ketika ia mendapatkan dua angka 6 berturut-turut. Setelah itu, giliran pemain berikutnya. (petunjuk: selalu simpan lemparan dadu sebelumnya dalam variabel terpisah)

2. Tambahkan bidang input ke HTML di mana pemain dapat mengatur skor kemenangan, sehingga mereka dapat mengubah skor yang telah ditentukan yaitu 100. (petunjuk: Anda dapat membaca nilai tersebut dengan properti. values pada JavaScript. Ini adalah kesempatan yang baik untuk menggunakan google untuk mencari tahu hal ini :)

3. tambahkan dadu lain ke dalam permainan, sehingga ada dua dadu sekarang. pemain kehilangan skornya saat ini ketika salah satu dadu bernilai 1. (petunjuk: Anda akan membutuhkan css untuk mengurutkan dadu yang kedua, jadi lihatlah kode css untuk dadu yang pertama
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3 update the round score IF the called number was NOT
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2; //roundScore = roundScore + dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }
        /* 
        if (dice === 6 && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
              //add score
              roundScore += dice; //roundScore = roundScore + dice;
              document.querySelector('#current--' + activePlayer).textContent = roundScore;

        } else {
              //next player
              nextPlayer();
        }
        lastDice = dice;
        */
    }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;       //scores[activePlayer] = scores[activePlayer] + roundScore;


        // update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final--score').value;
        var winningScore;

        // undefined, 0, null or "" are Coerced to false
        //anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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