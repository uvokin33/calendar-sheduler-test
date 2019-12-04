import React from 'react';
import moment from 'moment';
import { Views } from 'react-big-calendar';
import { 
  CURRENT_DATE, 
  CURRENT_DAY_HEADER_COLOR, 
  CURRENT_MONTH_HEADER_COLOR, 
  DAY_HEADER_COLOR 
} from '../../constants/mixinsContants';

const CustomDateHeader = ({ label, date, isOffRange }) => {
    const getDateHeaderColor = () => {
        const isDayCurrent = moment(date).isSame(CURRENT_DATE, Views.DAY);
        if (isDayCurrent) {
          return CURRENT_DAY_HEADER_COLOR;
        } else if (!isDayCurrent && isOffRange) {
          return DAY_HEADER_COLOR;
        }
        return CURRENT_MONTH_HEADER_COLOR;
      }

    return (
        <div style={{
          backgroundColor: getDateHeaderColor()
        }}>
          {label}
        </div>
    );
};

export default CustomDateHeader;
