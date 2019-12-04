import React from 'react';
import { Views } from 'react-big-calendar';
import ToolbarTitle from '../ToolbarTitle/ToolbarTitle';
import AddEvent from '../AddEvent/AddEvent';
import './Toolbar.scss';

const VIEWS = [Views.MONTH, Views.WEEK, Views.DAY]; 

const Toolbar = ({ view, label, date, onView, onNavigate }) => {
    const handleChangeNavigation = (action) => {
        onNavigate(action);
    }

    const handleChangeView = (action) => {
        onView(action);
    }

    return (
        <div className='rbc-toolbar'>
            <div className="filter-container">
                {VIEWS.map((value, index) => (
                    <button
                        key={index} 
                        className={`${view === value ? 'current' : ''}`} 
                        type="button" 
                        onClick={() => handleChangeView(value)}
                    >
                        {`${value[0].toUpperCase()}${value.substring(1)}`}
                    </button>  
                ))}
            </div>
            <span className="rbc-toolbar-label">
                <button type="button" onClick={() => handleChangeNavigation('PREV')}>{"<"}</button>
                <ToolbarTitle 
                    label={label} 
                    view={view} 
                    date={date} 
                />
                <button type="button" onClick={() => handleChangeNavigation('NEXT')}>{">"}</button>
            </span>
            <span className="rbc-btn-group">
                <AddEvent onView={onView} view={view}/>
            </span>
        </div>
    );
};

export default Toolbar;