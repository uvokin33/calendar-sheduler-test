import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import Toolbar from './components/Toolbar/Toolbar';
import CustomEvent from './components/CustomEvent/CustomEvent';
import CustomDateHeader from './components/CustomDateHeader/CustomDateHeader';
import { setDate } from './actions/mixinsActions';
import { CURRENT_DATE, CALENDAR_VIEWS } from './constants/mixinsContants';
import 'moment/locale/en-gb';
import './App.scss';

moment.locale('en-GB');

const localizer = momentLocalizer(moment);

const style = {
  height: '100vh',
}

const App = ({ dispatch, state }) => {
  const [view, setView] = useState(Views.MONTH);
  const [selectable, setSelectable] = useState(true);

  const handleDaySelect = ({ start }) => {
    if (view === Views.MONTH) {
      setView(Views.DAY);
      setSelectable(false);
      dispatch(setDate({ date: start }))
    }
  }

  const handleChangeView = (action) => {
    setSelectable(action === Views.MONTH ? true : false);
    setView(action);
    dispatch(setDate({ date: CURRENT_DATE }))
  }

  const handleChangeNavigae = (action) => {
    dispatch(setDate({ date: action }))
  }

  return (
    <div className="app">
      <Calendar
        selectable={selectable}
        view={view}
        date={state.dates}
        events={state.events}
        views={CALENDAR_VIEWS}
        startAccessor="start"
        endAccessor="end"
        style={style}
        localizer={localizer}
        onView={handleChangeView}
        onNavigate={handleChangeNavigae}
        onSelectSlot={handleDaySelect}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: CustomDateHeader
          },
          event: CustomEvent
        }}
      />
    </div>
  );
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(App);
