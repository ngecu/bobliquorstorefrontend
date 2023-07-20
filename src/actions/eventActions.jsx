import axios from 'axios';
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
} from '../constants/eventConstants';

// Action creator to fetch the list of events
export const listEvents = () => async (dispatch) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });

    const { data } = await axios.get('https://bobliquorstoreapi.onrender.com/api/events');

    dispatch({ type: EVENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator to fetch a single event by ID
export const getEventById = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/events/${eventId}`);

    dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator to create a new event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_CREATE_REQUEST });

    const { data } = await axios.post('https://bobliquorstoreapi.onrender.com/api/events', eventData);

    dispatch({ type: EVENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator to update an existing event
export const updateEvent = (eventId, eventData) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_UPDATE_REQUEST });

    const { data } = await axios.put(`https://bobliquorstoreapi.onrender.com/api/events/${eventId}`, eventData);

    dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator to delete an event
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DELETE_REQUEST });

    await axios.delete(`https://bobliquorstoreapi.onrender.com/api/events/${eventId}`);

    dispatch({ type: EVENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
