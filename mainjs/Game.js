export default class Game{
    constructor() {
        this.board = new Array(9).fill(null)
        this.turn = "X"
        console.log("Game module loaded.");
    };

    nextTurn(){
        if(this.turn == "X"){
            this.turn = "O"
        } else{
            this.turn = "X"
        };

    };

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

        this.findWinningCondition();

        let winningCombination =this.findWinningCondition();
        if(winningCombination){
            this.nextTurn();
        }
    }

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
}