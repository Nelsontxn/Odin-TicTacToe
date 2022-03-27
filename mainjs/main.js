import Game from "./Game.js"
import gameView from "./gameView.js"

console.log("Main.js Loaded")

let game = new Game()

let GameView = new gameView()


let tiles = document.querySelectorAll('.board-tile');

console.log(tiles);

tiles.forEach((tile) => {
    tile.addEventListener("click", () =>{

        clickAction(tile.dataset.value);
    })
}
);

function clickAction(i){
    game.makeMove(i)
    GameView.updateBoard(game)
    game.nextTurn()
};
