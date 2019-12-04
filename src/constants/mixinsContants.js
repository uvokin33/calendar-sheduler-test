import moment from 'moment';

export const MONTHS_NAMES = moment.months();

export const CURRENT_DATE = moment().toDate();

export const CALENDAR_VIEWS = {
    month: true,
    week: true,
    day: true,
};

export const DATE_FORMAT = 'DD.MM.YYYY';
  
export const CURRENT_DAY_HEADER_COLOR = '#7ab4e0';
export const CURRENT_MONTH_HEADER_COLOR = '#ffffff';
export const DAY_HEADER_COLOR = '#e6e6e6';

export const ERROR_MESSAGE_EMPTY_TITLE = 'You must fill title field.';
export const ERROR_MESSAGE_END_TIME_LESS_THEN_START_TIME = 'End time must be greater then start time.';
export const ERROR_MESSAGE_EVENTS_INTERSECTS = 'Current event time intersects with another event.';
