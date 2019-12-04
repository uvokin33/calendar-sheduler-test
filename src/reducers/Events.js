import { ADD_EVENT } from '../constants/reducerConstants';

const Events = (state = [], action) => {
    switch(action.type) {
        case ADD_EVENT:
            return [
                ...state,
                {
                    title: action.description,
                    description: action.title,
                    start: action.start,
                    end: action.end,
                }
            ]
        default:
            return state;
    }
};

export default Events;
