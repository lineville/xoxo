import { Map } from 'immutable'

const MOVE = 'move'

const switchTurn = turn => {
  return turn === 'X' ? 'O' : 'X'
}

const streaks = (board, allCoords) => {
  const mover = [];
  for(let i = 0; i < allCoords.length; i ++) {
    if(isValid(allCoords[i][0], allCoords[i][1])) {
      mover.push(board.getIn(allCoords[i]));
    }
    else {
      console.log("This was the invalid coordinate:",allCoords[i])
      break;
    }
  }

  if(mover.every(value => value === 'X')) {
    return 'X';
  }
  else if(mover.every(value => value === 'O')) {
    return 'O';
  }
  else {
    return undefined;
  }
}

const isValid = (coordOne, coordTwo) => {
  return(
    coordOne <= 2 &&
    coordOne >= 0 &&
    coordTwo <= 2 &&
    coordTwo >= 0
  )
}

const rowOne = [[0,0],[0,1],[0,2]];
const rowTwo = [[1,0],[1,1], [1,2]];
const rowThree = [[2,0],[2,1],[2,2]];
const colOne = [[0,0],[1,0],[2,0]];
const colTwo = [[0,1],[1,1],[2,1]];
const colThree = [[0,2],[1,2],[2,2]];
const diagOne = [[0,0],[1,1],[2,2]];
const diagTwo = [[0,2],[1,1],[2,0]];

const rowsToCheck = [rowOne, rowTwo, rowThree, colOne, colTwo, colThree, diagOne, diagTwo];

export function move(turn, position) {
  return { type: MOVE, turn, position }
}

function winner(board) {
  for(let i = 0; i < rowsToCheck.length; i ++) {
    const result = streaks(board, rowsToCheck[i]);
    if(result) {
      return result;
    }
  }
  console.log("No winner yet");
  return undefined;
}

export default function reducer(state = { turn: 'X', board: Map(), winner: undefined }, action) {
  switch (action.type) {
    case MOVE:
      const newState = {
        turn: switchTurn(state.turn),
        board: state.board.setIn(action.position, action.turn),
        winner: undefined,
      };
      const winningPlayer = winner(newState.board);
      if(winningPlayer) {
        return Object.assign({}, newState, {winner: winningPlayer})
      }
      else {
        return newState;
      }
    default:
      return state
  }
}
