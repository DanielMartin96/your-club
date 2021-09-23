import {
  ADD_PLAYER,
  GET_PLAYER,
  GET_PLAYERS,
  LOGOUT,
  REMOVE_PLAYER,
} from '../actions/types';

const initialState = {
  players: [],
  player: null,
  loading: true,
  error: {},
};

function playerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [payload, ...state.players],
        loading: false,
      };
    case GET_PLAYER:
      return {
        ...state,
        player: payload,
        loading: false,
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false,
      };
    case REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(player => player._id !== payload),
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        player: null,
        players: [],
      };
    default:
      return state;
  }
}

export default playerReducer;
