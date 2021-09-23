import api from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_PLAYER,
  GET_PLAYER,
  EDIT_PLAYER,
  GET_PLAYERS,
  REMOVE_PLAYER,
} from './types';

// Add Player
export const addPlayer = formData => async dispatch => {
  try {
    const res = await api.post('/players', formData);

    dispatch({
      type: ADD_PLAYER,
      payload: res.data,
    });

    dispatch(setAlert('Player Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get Players
export const getPlayers = email => async dispatch => {
  try {
    const res = await api.get(`/players/email/${email}`);

    dispatch({
      type: GET_PLAYERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get Player
export const getPlayer = id => async dispatch => {
  try {
    const res = await api.get(`/players/edit/${id}`);

    dispatch({
      type: GET_PLAYER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Edit Player
export const editPlayer = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/players/${id}`, formData);

    console.log(res);

    dispatch({
      type: EDIT_PLAYER,
      payload: res.data,
    });

    dispatch(setAlert('Player Saved', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete Player
export const removePlayer = id => async dispatch => {
  try {
    const res = await api.delete(`/players/${id}`);

    console.log(res.data);

    dispatch({
      type: REMOVE_PLAYER,
      payload: res.data,
    });

    dispatch(setAlert('Player Deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};
