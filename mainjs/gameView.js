export default class gameView{

    constructor(){
        console.log("gameView.js Loaded.")
    }

    updateBoard(game){
        for(let i = 0; i < game.board.length; i++){
            const tile = document.querySelector(`.board-tile[data-value = '${i}']`);
            tile.textContent = game.board[i];
        }
    }

}