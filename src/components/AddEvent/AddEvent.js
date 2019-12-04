import React from 'react';
import { Views } from 'react-big-calendar';
import Popup from "reactjs-popup";
import AddEventModal from '../../containers/AddEventModal';

const contentStyle = {
    borderRadius: '10px',
    width: 'auto',
    minWidth: '500px',
};

const AddEvent = ({ view, onView }) => {    
    const handleChangeToDayView = () => {
        if (view !== Views.DAY) {
            onView(Views.DAY);
        }
    }

    return (
        <div className="add-event-popup">
            <Popup
                modal
                closeOnDocumentClick
                trigger={<button>+ Add new</button>}
                contentStyle={contentStyle}
                onOpen={handleChangeToDayView}
            >
                {close => (
                    <AddEventModal close={close} />
                )}
            </Popup>    
        </div>
    );
}

export default AddEvent;