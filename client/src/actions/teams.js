import api from '../utils/api';
import { setAlert } from './alert';
import { ADD_TEAM, EDIT_TEAM, GET_TEAM, GET_TEAMS, REMOVE_TEAM } from './types';

// Add Team
export const addTeam = formData => async dispatch => {
  try {
    const res = await api.post('/teams', formData);

    dispatch({
      type: ADD_TEAM,
      payload: res.data,
    });

    dispatch(setAlert('Team Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get Teams
export const getTeams = email => async dispatch => {
  try {
    const res = await api.get(`/teams/${email}`);

    dispatch({
      type: GET_TEAMS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get Team
export const getTeam = id => async dispatch => {
  try {
    const res = await api.get(`/teams/edit/${id}`);

    dispatch({
      type: GET_TEAM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Edit Team
export const editTeam = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/teams/${id}`, formData);

    dispatch({
      type: EDIT_TEAM,
      payload: res.data,
    });

    dispatch(setAlert('Team Saved', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete Team
export const removeTeam = id => async dispatch => {
  try {
    const res = await api.delete(`/teams/${id}`);

    dispatch({
      type: REMOVE_TEAM,
      payload: res.data,
    });

    dispatch(setAlert('Team Deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
  }
};
