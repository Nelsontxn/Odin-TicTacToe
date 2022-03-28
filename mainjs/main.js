import Game from "./Game.js"
import gameView from "./gameView.js"

console.log("Main.js Loaded")

let game = new Game()

let GameView = new gameView()


let tiles = document.querySelectorAll('.board-tile');

let restart = document.querySelector('.restart');

let Newgame = document.getElementById('NewgameButton')

tiles.forEach((tile) => {
    tile.addEventListener("click", () =>{

        clickAction(tile.dataset.value);
    })
}
);

function clickAction(i){
    game.makeMove(i);
    GameView.updateBoard(game);
    game.nextTurn();
    game.CheckWhoWins();
};

restart.addEventListener("click", () =>{

    console.log('clicked Restart.');
    game.refreshboard();
    GameView.updateBoard(game);
});

Newgame.addEventListener("click", ()=>{

    console.log('clicked New Game!');
    game.refreshboard();
    GameView.updateBoard(game);
    game.hideWinMesage();

})