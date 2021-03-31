// alert("hi bitch");// for checking javascript if its working
// $("h1").css("color","red");//for checking jquery if its working



const statusDisplay=document.querySelector('.game-status');

let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];
const winningMsg=() => `Player ${currentPlayer} has won!`;
const drawMsg=() => `Game ended in a draw!`;
const currentPlayerTurn=() => `It's ${currentPlayer}'s turn `;

statusDisplay.innerHTML=currentPlayerTurn();


const winningConditions=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

function handleResultValidation(){

   let roundWon=false;
   for(let i=0;i<=7;i++)     
   {
       const winCondition=winningConditions[i];
        let a=gameState[winCondition[0]];
        let b=gameState[winCondition[1]];
        let c=gameState[winCondition[2]];

        if(a ==='' || b==='' || c===''){
        continue;
        }
        if(a === b && b === c){//check whether the elements of our game state array under those indexes match. 
        roundWon=true;
        break;
        }
   }
   if(roundWon){
       statusDisplay.innerHTML=winningMsg();
       gameActive=false;
       return;
   }

   let roundDraw=!gameState.includes("");
   if(roundDraw)
   {
       statusDisplay.innerHTML=drawMsg();//all spaces r filled
       gameActive=false;
       return;
   }
   handlePlayerChange();//moves to be played

}

function handlePlayerChange(){
    currentPlayer= currentPlayer==="X"?"O":"X";//switch players
    statusDisplay.innerHTML=currentPlayerTurn();
}

function handleCellClick(clickedCellEvent){

    const clickedCell=clickedCellEvent.target;

    const clickedCellIndex=parseInt(clickedCell.getAttribute('data-cell'));
    
    if(gameState[clickedCellIndex]!== ""|| !gameActive)
    {
        return;
    }
     handleCellPlayed(clickedCell,clickedCellIndex);
     handleResultValidation();

}

function handleCellPlayed(clickedCell,clickedCellIndex){
 
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;//we put the x in here
}

function handleRestartGame(){
     gameActive=true;
     currentPlayer="X";
     gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML="");

}

//event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.restart').addEventListener('click',handleRestartGame);
