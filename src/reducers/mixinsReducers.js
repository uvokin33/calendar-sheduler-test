import { combineReducers } from 'redux';
import Events from './Events';
import Dates from './Dates';

export default combineReducers({
    events: Events,
    dates: Dates,
});