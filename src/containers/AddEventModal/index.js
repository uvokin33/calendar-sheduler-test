import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/mixinsActions';
import DatePicker, { registerLocale } from 'react-datepicker';
import en_gb from "date-fns/locale/en-GB";
import { Views } from 'react-big-calendar';
import {
    ERROR_MESSAGE_EMPTY_TITLE,
    ERROR_MESSAGE_END_TIME_LESS_THEN_START_TIME,
    ERROR_MESSAGE_EVENTS_INTERSECTS,
} from '../../constants/mixinsContants';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import './style.scss';

registerLocale('en-GB', en_gb);

const moment = extendMoment(Moment)


const AddEventModal = ({ state, dispatch, close }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(moment().toDate());
    const [timeStartHour, setTimeStartHour] = useState(0);
    const [timeStartMinute, setTimeStartMinute] = useState(0);
    const [timeEndHour, setTimeEndHour] = useState(0);
    const [timeEndMinute, setTimeEndMinute] = useState(0);
    const [error, setError] = useState('');
    
    const showError = (errorMessage, event) => {
        event.preventDefault();
        event.stopPropagation();
        setError(errorMessage);
        return true;
    }

    const handleAddNewEvent = (event) => {
        const sameDayEvents = [];
        let isError = false;

        const startDate = moment(date).set({ 
            hour: timeStartHour, 
            minute: timeStartMinute 
        });
        const endDate = moment(date).set({ 
            hour: timeEndHour, 
            minute: timeEndMinute 
        });

        state.events.forEach(value => {
            const eventDate = moment(value.start);
            if (
                eventDate.isSame(date, 'year') && 
                eventDate.isSame(date, Views.MONTH) && 
                eventDate.isSame(date, Views.DAY)
            ) {
                sameDayEvents.push(value);
            }
        });

        if (!title) {
            isError = showError(ERROR_MESSAGE_EMPTY_TITLE, event);
        } else if (
            (timeStartHour > timeEndHour) ||
            (timeStartHour === timeEndHour && 
                timeStartMinute === timeEndMinute) || 
            (timeStartHour >= timeEndHour && 
                timeStartMinute > timeEndMinute)
        ) {
            isError = showError(ERROR_MESSAGE_END_TIME_LESS_THEN_START_TIME, event);
        } else if (sameDayEvents.length) {
            sameDayEvents.forEach(value => {
                const range = moment.range(value.start, value.end);
                const newEventRange = moment.range(startDate, endDate);
                if (range.overlaps(newEventRange)) {
                    isError = showError(ERROR_MESSAGE_EVENTS_INTERSECTS, event);
                    return;
                }
            });
        }

        if (!isError) {
            dispatch(addEvent({
                title,
                description,
                start: startDate.toDate(),
                end: endDate.toDate()
            }));
            close();
        }
    }

    return (
        <div className="add-event-modal">
            <div className="add-event-content">
                <h2>New Event</h2>
                <hr />
                <div className="modal-content modal-content__name">
                    <p>Name</p>
                    <input type="text" onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className="modal-content modal-content__description">
                    <p>Description</p>
                    <input type="text" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className="modal-content modal-content__date">
                    <p>Date</p>
                    <DatePicker
                        dateFormat="dd.MM.yyyy"
                        selected={date}
                        locale="en-GB"
                        todayButton="Today"
                        onChange={newDate => setDate(newDate)}
                    />
                </div>
                <div className="modal-content modal-content__time-from">
                    <p>Time from</p>
                    <input type="number" placeholder={0} max={23} min={0} onChange={(event) => 
                        setTimeStartHour(parseInt(event.target.value))} 
                    />
                    <input type="number" placeholder={0} max={59} min={0} onChange={(event) => 
                        setTimeStartMinute(parseInt(event.target.value))} 
                    />
                </div>
                <div className="modal-content modal-content__time-to">
                    <p>Time to</p>
                    <input type="number" placeholder={0} max={23} min={0} onChange={(event) => 
                        setTimeEndHour(parseInt(event.target.value))} 
                    />
                    <input type="number" placeholder={0} max={59} min={0} onChange={(event) => 
                        setTimeEndMinute(parseInt(event.target.value))} 
                    />
                </div>
                <div className="modal-content modal-content__error right">
                    <p className="error">{error}</p>
                    <button type="button" onClick={handleAddNewEvent}>Create</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(AddEventModal);