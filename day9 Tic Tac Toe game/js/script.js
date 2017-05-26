(function () {

  var turn = 0;
  var winchk = false;
  var winPlayer;
  var playerTurnText = document.getElementById("playerTurnText");
  var temp;

  // Winning combination
  var winStr = '012|345|678|036|147|258|048|246';

  // Event hander for game start
  function game() {
    var target = event.target || event.srcElement;
    //turn checking
    turn % 2 === 0 ? playerTurn(target, 1) : playerTurn(target, 2);
    // gameover or end check
    setTimeout(function () {
      gameOver();
      if (turn === 9) {
        (confirm('Draw! want more game?') ? resetBoard() : endGame());
      }
    }, 2000);
  }

  // Putting O or X on the board
  var playerTurn = function (element, player) {
    element.style.borderRadius = '20px';
    element.className = 'animated bounceIn';
    if (player === 1 && element.textContent === '') { // Player 1
      element.innerHTML = 'O';
      element.style.backgroundColor = 'rgb(244, 66, 166)';
      playerTurnText.innerHTML = "It is Player2(X)'s turn";
      turn++;
    } else if (element.textContent === '') { // Player 2
      element.innerHTML = 'X';
      element.style.backgroundColor = 'rgb(9, 55, 103)';
      playerTurnText.innerHTML = "It is Player1(O)'s turn";
      turn++;
    }
    winnerchk(element, element.textContent);
  };

  // Check winner
  var winnerchk = function (element, ox) {
    // Replace the char in winStr to X or O.
    winStr = winStr.replace(new RegExp(element.dataset.num, 'g'), ox);
    // if there is 'OOO' or 'YYY' in wintStr, check winner.
    if (/\X{3}|\O{3}/g.test(winStr)) {
      winPlayer = /\O{3}/g.test(winStr) ? 1 : 2;
      winchk = true;
    }
  };

  // Game ending
  var gameOver = function () {
    if (winchk === true) {
      winchk = false;
      alert('GameOver! Player' + winPlayer + ' wins!');
      (confirm("Want more games?") ? resetBoard() : endGame());
      // YES : resetBoard // NO: remove the click event
    }
  };

  // Reset board
  var resetBoard = function () {
    winStr = '012|345|678|036|147|258|048|246'; // reset winning seed
    turn = 0; // reset turn number
    for (var i = 0; i < 9; i++) {
      temp = document.getElementsByTagName('td')[i]
      temp.innerHTML = '';
      temp.style.backgroundColor = 'white';
      temp.style.borderRadius = '0px';
      temp.className = '';
    }
    playerTurnText.innerHTML = "It is Player1(O)'s turn"
  };

  // Delete Click Event.
  var endGame = function () {
    turn = 0;
    return document.getElementById('wrapper').removeEventListener('click', game, true);
  };

  // Event Delegation
  document.getElementById('wrapper').addEventListener('click', game, true);

  // Event listening to the reset button
  document.getElementById('reset').addEventListener('click', function () {
    resetBoard();
  }, true);

}());
