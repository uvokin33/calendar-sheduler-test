import { ADD_EVENT, SET_DATE } from '../constants/reducerConstants';

export const addEvent = (payload) => ({
    type: ADD_EVENT,
    ...payload
});

export const setDate = (payload) => ({
    type: SET_DATE,
    ...payload
});