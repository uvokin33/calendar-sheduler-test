import React from 'react';
import Popup from "reactjs-popup";
import { Views } from 'react-big-calendar';
import DatePicker, { registerLocale } from 'react-datepicker';
import en_gb from "date-fns/locale/en-GB";
import { connect } from 'react-redux';
import { setDate } from '../../actions/mixinsActions';
import { MONTHS_NAMES, DATE_FORMAT } from '../../constants/mixinsContants';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
// import 'moment/locale/en-gb';
import './style.scss';

registerLocale('en-GB', en_gb);

const moment = extendMoment(Moment)

const style = {
    display: 'inline',
};

const contentStyle = {
    width: 'auto', 
    zIndex: 10,
};

const ToolbarTitle = ({ view, label, date, dispatch }) => {
    let calendarPopup = null;

    const handleSetDate = (date) => {
        dispatch(setDate({ date }));
    }

    if (view === Views.MONTH) {
        calendarPopup = (
            <div>
                <button onClick={() => 
                    handleSetDate(moment().toDate())}
                >
                    Today
                </button>
                <div className="month-buttons">
                    {MONTHS_NAMES.map((value, index) => (
                        <button key={index} onClick={() => 
                            handleSetDate(
                                moment(date).set({ month: index }).toDate()
                            )
                        }>
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else if (view === Views.WEEK) {
        const weeks = [];
        const time = [-1, 0, 1, 2, 3];

        time.forEach(value => {
            const endDate = moment(date).startOf(Views.WEEK).add(value, 'weeks').subtract(1, 'days');
            const endWeek = endDate._d;
            const startWeek = moment(endWeek).subtract(6, 'days');
            weeks.push({
                label: `${moment(startWeek).format(DATE_FORMAT)} - ${moment(endWeek).format(DATE_FORMAT)}`, 
                startWeek
            });
        });

        calendarPopup = (
            <div>
                 <button onClick={() => 
                    handleSetDate(moment().toDate())}
                >
                    Today
                </button>
                <div className="week-buttons">
                    {weeks.map((value, index) => (
                        <button key={index} onClick={() => 
                            handleSetDate(
                                moment(value.startWeek).toDate()
                            )
                        }>
                            {value.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    } else if (view === Views.DAY) {
        calendarPopup = (
            <DatePicker
                selected={date}
                locale="en-GB"
                onChange={newDate => handleSetDate(newDate)}
                todayButton="Today"
                inline
            />
        );
    }

    return (
        <div className="toolbar-title-container" style={style}>
            <Popup
                contentStyle={contentStyle}
                position="bottom center"
                closeOnDocumentClick
                trigger={
                    <div style={style}>{label}</div>
                }
            >
                {calendarPopup}
            </Popup> 
            
        </div>
    );
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ToolbarTitle);