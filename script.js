
const gameBoard = (() =>{
    board=['','','','','','','','','']
    const setField = (index,marker) =>{
        if(index > board.length) return;
        board[index] = marker;
    };
    const getField = (index) =>{
        if(index > board.length) return;
        return board[index]
    };
    const reset = () => {
        for(let i = 0;i < board.length;i++){
            board[i] = "";
        }
    };
    return {setField,getField,reset};
})();


const Player = function(marker){
    marker = marker;
    const getMarker = () =>{
        return marker;
    };
    return {getMarker};
}

const displayController = (() =>{
    const cells = document.querySelectorAll('.cell');
    const currentPlayer = document.querySelector('.current-player');
    const winningMessage = document.querySelector('.winning-message');
    const winningMessageText = document.querySelector('#winning-message-text');
    const restartButton = document.querySelector('#restartButton');
    cells.forEach(cell => {
        cell.addEventListener('click',(e) =>{
            if(e.target.classList.contains('x') || e.target.classList.contains('o')) return;
            gameController.playRound(e.target.dataset.cell);
        })
    })
    const setCurrentPlayer = (marker) => {
        currentPlayer.textContent = `Current player is ${marker.toUpperCase()}`;
    }
    const markField = (index,marker) => {

        cells.forEach(cell => {
            if(cell.dataset.cell == index){
                cell.classList.add(marker);
            }
        });
    }
    const displayWinMessage = (winner) => {
        winningMessageText.textContent = `The winner is Player ${winner.toUpperCase()}`;
        winningMessage.classList.add('show');
    }
    const displayDrawMessage = () => {
        winningMessageText.textContent = `The Game is a Draw!`;
        winningMessage.classList.add('show');
    }
    const resetDisplay = () => {
        cells.forEach(cell =>{
            cell.classList.remove('x');
            cell.classList.remove('o');
        })
        winningMessage.classList.remove('show');
    }
    restartButton.addEventListener('click',(e) => {
        gameController.restartGame();
    })
    return {markField,displayWinMessage,resetDisplay,displayDrawMessage,setCurrentPlayer};
})();

const gameController = (() => {
    const playerX = Player('x');
    const playerO = Player('o');
    let round = 1;
    let isOver = false;
    currentPlayer = playerX;
    displayController.setCurrentPlayer(currentPlayer.getMarker());
    const winConditions = []
    const playRound = (fieldIndex) =>  {
        let marker = currentPlayer.getMarker();
        displayController.markField(fieldIndex,marker);
        gameBoard.setField(fieldIndex,marker);
        if(checkWinner()){
            isOver = true;
            displayController.displayWinMessage(marker);
        }
        if(round == 9){ // result is draw
            displayController.displayDrawMessage();
        } 
        if(currentPlayer == playerX){
            currentPlayer = playerO;
        }
        else{
            currentPlayer = playerX;
        }
        round++;
        displayController.setCurrentPlayer(currentPlayer.getMarker());
    }
    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        return winConditions
        .some((winCondition) =>
             winCondition.every(index => 
                gameBoard.getField(index) == currentPlayer.getMarker()
            )
        ); 
    }
    const restartGame = () =>{
        gameBoard.reset();
        displayController.resetDisplay();
        isOver = false;
        currentPlayer = playerX;
        round = 1;
        displayController.setCurrentPlayer(currentPlayer.getMarker());
    }
    return {playRound,restartGame};
})();