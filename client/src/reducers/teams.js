import {
  ADD_TEAM,
  GET_TEAM,
  GET_TEAMS,
  LOGOUT,
  REMOVE_TEAM,
} from '../actions/types';

const initialState = {
  teams: [],
  team: null,
  loading: true,
  error: {},
};

function teamReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TEAM:
      return {
        ...state,
        teams: [payload, ...state.teams],
        loading: false,
      };
    case GET_TEAM:
      return {
        ...state,
        team: payload,
        loading: false,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
        loading: false,
      };
    case REMOVE_TEAM:
      return {
        ...state,
        players: state.teams.filter(team => team._id !== payload),
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        team: null,
        teams: [],
      };
    default:
      return state;
  }
}

export default teamReducer;
