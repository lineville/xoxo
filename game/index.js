import { Map } from 'immutable'

const MOVE = 'move'

const switchTurn = turn => {
  return turn === 'X' ? 'O' : 'X'
}
export function move(turn, position) {
  return { type: MOVE, turn, position }
}

export default function reducer(state = { turn: 'X', board: Map() }, action) {
  switch (action.type) {
    case MOVE:
      return {
        turn: switchTurn(state.turn),
        board: state.board.setIn(action.position, action.turn),
      }
    default:
      return state
  }
}
