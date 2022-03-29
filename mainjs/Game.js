export default class Game{
    constructor() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
        this.GameMode = "PvP";
        this.highlightActivePlayer();
        console.log("Game module loaded.");
    };


    //Switch Gamemode
    SwitchGamemode(){
        if(this.GameMode == "PvP"){
            this.GameMode = "VsAI"
        } else{
            this.GameMode = 'PvP'
        };
        
    };


    //switch players...
    nextTurn(){
        if(this.turn == "X"){
            this.turn = "O"
        } else{
            this.turn = "X"
        };

    };


    //make Move aka press the button
    makeMove(i){
        //check if the game has ended.
        if(this.endOfGame()){
            return
        }

        //make sures that this only runs once by checking if this.board[i] is not empty        
        if(this.board[i]){
            return
        }


        this.board[i] = this.turn;

        this.highlightActivePlayer();

        this.findWinningCondition();

        let winningCombination =this.findWinningCondition();
        if(winningCombination){
            this.nextTurn();
        }
        
    }


    //generic find the winning conditions
    findWinningCondition(){
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        
        for(const combinations of winningCombinations){
            const [a,b,c] = combinations;

            if(this.board[a] && (
                this.board[a] === this.board[b] && this.board[a] === this.board[c])){
                    return combinations;
                }
        }
    return null;
    }


    //checks for end game combination if there is a winning combinations
    endOfGame(){
        let winningCombination = this.findWinningCondition();

        if(winningCombination){
            return true;
        } else{
            return false;
        }
    }


    //refreshes the board for new game.
    refreshboard(){
        this.board = new Array(9).fill(null);
        this.turn = "X";
        this.highlightActivePlayer();
    }



    //Some UI stuff to highlight the active player.
    highlightActivePlayer(){
        let PlayerXActive = document.querySelector('.PlayerX')
        let PlayerYActive = document.querySelector('.PlayerY')
        if(this.turn === "X"){
            PlayerXActive.classList.add('PlayerActive')
            PlayerYActive.classList.remove('PlayerActive')
        }else{
            PlayerYActive.classList.add('PlayerActive')
            PlayerXActive.classList.remove('PlayerActive')
        }
    }


    CheckWhoWins(){
        let winningCombination = this.findWinningCondition();
        let checkboardfull = this.CheckArrayfull();
        console.log('checkboardfull: '+checkboardfull);
        console.log('winningcombinations' + this.endOfGame())
        if(checkboardfull){
            this.WinMessage(false);
        }
        if(!winningCombination){
            return
        }
        if(winningCombination){
            this.WinMessage(true);
        }
    }

    WinMessage(Boo){
        let PopupWinScreen = document.querySelector('.WinningScreen');

        let CreditText = document.querySelector('.CreditText');

        CreditText.textContent = '';

        PopupWinScreen.style.visibility = 'visible';

        if(!Boo){
            CreditText.textContent = 'it\'s a draw!';
            
        }else{
            CreditText.textContent = `Player ${this.turn} Wins!`;
        }
    }


    hideWinMesage(){

        let PopupWinScreen = document.querySelector('.WinningScreen');

        PopupWinScreen.style.visibility = 'hidden';
    }


    CheckArrayfull(){
        if(this.board.includes(null)){
            return false;
        } else{
            return true;
        }
    }
}