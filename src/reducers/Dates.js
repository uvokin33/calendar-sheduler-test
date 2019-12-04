import { SET_DATE } from '../constants/reducerConstants';

const Dates = (state = new Date(), action) => {
    switch(action.type) {
        case SET_DATE: 
            return action.date
        default:
            return state;
    }
};

export default Dates;
