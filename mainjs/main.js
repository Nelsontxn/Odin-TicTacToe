import Game from "./Game.js"
import gameView from "./gameView.js"

console.log("Main.js Loaded")

let game = new Game()

let GameView = new gameView()


let tiles = document.querySelectorAll('.board-tile');

let Retry = document.getElementById('Retry')

let Newgame = document.getElementById('NewgameButton')

let PvP = document.getElementById('Versus');

let PvAI = document.getElementById('VsAI');

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

Retry.addEventListener("click", () =>{

    console.log('clicked Restart.');
    game.refreshboard();
    GameView.updateBoard(game);
});

Newgame.addEventListener("click", ()=>{

    console.log('clicked New Game!');
    game.refreshboard();
    GameView.updateBoard(game);
    game.hideWinMesage();

});


PvP.addEventListener("click", ()=>{
    if(game.GameMode == "PvP"){
        return
    }


    game.refreshboard();
    GameView.updateBoard(game);
    game.SwitchGamemode();
    console.log(`Game Mode: ${game.GameMode}`)
    PvP.classList.remove('restart');
    PvP.classList.add('toggleModeBtn');
    PvAI.classList.remove('toggleModeBtn');
    PvAI.classList.add('restart');
});



PvAI.addEventListener("click", ()=>{
    if(game.GameMode == "VsAI"){
        return
    }


    game.refreshboard();
    GameView.updateBoard(game);
    game.SwitchGamemode();
    console.log(`Game Mode: ${game.GameMode}`)
    PvAI.classList.remove('restart');
    PvAI.classList.add('toggleModeBtn');
    PvP.classList.remove('toggleModeBtn');
    PvP.classList.add('restart');
});
