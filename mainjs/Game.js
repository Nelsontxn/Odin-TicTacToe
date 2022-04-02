export default class Game {
  constructor() {
    this.board = new Array(9).fill(null);
    this.turn = "X";
    this.GameMode = "PvP";
    this.Player = "X";
    this.AIBot = "O";
    this.highlightActivePlayer();
    console.log("Game module loaded.");
  }

  //Switch Gamemode
  SwitchGamemode() {
    if (this.GameMode == "PvP") {
      this.GameMode = "VsAI";
    } else {
      this.GameMode = "PvP";
    }
  }

  //switch players...
  nextTurn() {
    if (this.turn == "X") {
      this.turn = "O";
    } else {
      this.turn = "X";
    }
  }

  //make Move aka press the button
  makeMove(i) {
    //check if the game has ended.
    if (this.endOfGame()) {
      return;
    }

    //make sures that this only runs once by checking if this.board[i] is not empty
    if (this.board[i]) {
      return;
    }

    this.board[i] = this.turn;

    this.highlightActivePlayer();

    this.findWinningCondition();

    let winningCombination = this.findWinningCondition();
    if (winningCombination) {
      this.nextTurn();
    }
  }

  //generic find the winning conditions
  findWinningCondition() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinations of winningCombinations) {
      const [a, b, c] = combinations;

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return combinations;
      }
    }
    return null;
  }

  //checks for end game combination if there is a winning combinations
  endOfGame() {
    let winningCombination = this.findWinningCondition();

    if (winningCombination) {
      return true;
    } else {
      return false;
    }
  }

  //refreshes the board for new game.
  refreshboard() {
    this.board = new Array(9).fill(null);
    this.turn = "X";
    this.highlightActivePlayer();
  }

  //Some UI stuff to highlight the active player.
  highlightActivePlayer() {
    let PlayerXActive = document.querySelector(".PlayerX");
    let PlayerYActive = document.querySelector(".PlayerY");
    if (this.turn === "X") {
      PlayerXActive.classList.add("PlayerActive");
      PlayerYActive.classList.remove("PlayerActive");
    } else {
      PlayerYActive.classList.add("PlayerActive");
      PlayerXActive.classList.remove("PlayerActive");
    }
  }

  CheckWhoWins() {
    let winningCombination = this.findWinningCondition();
    let checkboardfull = this.CheckArrayfull();
    console.log("checkboardfull: " + checkboardfull);
    console.log("winningcombinations" + this.endOfGame());
    if (checkboardfull) {
      this.WinMessage(false);
    }
    if (!winningCombination) {
      return;
    }
    if (winningCombination) {
      this.WinMessage(true);
    }
  }

  WinMessage(Boo) {
    let PopupWinScreen = document.querySelector(".WinningScreen");

    let CreditText = document.querySelector(".CreditText");

    CreditText.textContent = "";

    PopupWinScreen.style.visibility = "visible";

    if (!Boo) {
      CreditText.textContent = "it's a draw!";
    } else {
      CreditText.textContent = `Player ${this.turn} Wins!`;
    }
  }

  hideWinMesage() {
    let PopupWinScreen = document.querySelector(".WinningScreen");

    PopupWinScreen.style.visibility = "hidden";
  }

  CheckArrayfull() {
    if (this.board.includes(null)) {
      return false;
    } else {
      return true;
    }
  }

  //MinMaxAlgorithm Implementation

  CheckIfGameModeIsBots() {
    if (this.GameMode === "VsAI" &&this.turn == 'O') {
        this.MakeBestMoveAI();
    }
  }

  //Evaluate function for the bots

  Evaluate(b) {
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
      if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
        if (b[row][0] == this.AIBot) return +10;
        else if (b[row][0] == this.Player) return -10;
      }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
      if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
        if (b[0][col] == this.AIBot) return +10;
        else if (b[0][col] == this.Player) return -10;
      }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
      if (b[0][0] == this.AIBot) return +10;
      else if (b[0][0] == this.Player) return -10;
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
      if (b[0][2] == this.AIBot) return +10;
      else if (b[0][2] == this.Player) return -10;
    }

    // Else if none of them have
    // won then return 0
    return 0;
  }

  //array manipulation for the alogrithm

  SliceArray(arr) {
    return [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)];
  }

  MergeArray(arr) {
    return arr[0].concat(arr[1]).concat(arr[2]);
  }

  // This is the minimax function. It
  // considers all the possible ways
  // the game can go and returns the
  // value of the board

  minimax(board, depth, isMax) {
    let score = this.Evaluate(board);

    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10) return score;

    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10) return score;

    // If there are no more moves and
    // no winner then it is a tie
    if (this.CheckArrayfull() == true) return 0;

    // If this maximizer's move
    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == null) {
            // Make the move
            board[i][j] = this.AIBot;

            // Call minimax recursively
            // and choose the maximum value
            best = Math.max(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = null;
          }
        }
      }
      return best - depth;
    }

    // If this minimizer's move
    else {
      let best = 1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == null) {
            // Make the move
            board[i][j] = this.Player;

            // Call minimax recursively and
            // choose the minimum value
            best = Math.min(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = null;
          }
        }
      }
      return best + depth;
    }
  }

  findBestMove(board) {
    let bestVal = -1000;
    let BestMoverow = -1;
    let BestMovecol = -1;

    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] == null) {
          // Make the move
          board[i][j] = this.AIBot;

          // compute evaluation function
          // for this move.
          let moveVal = this.minimax(board, 0, false);

          // Undo the move
          board[i][j] = null;

          // If the value of the current move
          // is more than the best value, then
          // update best
          if (moveVal > bestVal) {
            BestMoverow= i;
            BestMovecol = j;
            bestVal = moveVal;
          }
        }
      }
    }

    console.log(
      "The value of the best Move " + "is : ",
      bestVal + "<br><br>" +
      "The Best Position is: " + BestMoverow  + "," + BestMovecol
    );

    board[BestMoverow][BestMovecol] = this.AIBot;

    return board;
  }

  MakeBestMoveAI(){
    let Tempboard = this.SliceArray(this.board);
    this.findBestMove(Tempboard);
    console.log(Tempboard);
    this.board = this.MergeArray(Tempboard);
    console.log(this.board);
  }



}
