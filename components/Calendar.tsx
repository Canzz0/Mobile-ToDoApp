import React from 'react';
import { Calendar } from 'react-native-calendars';

interface CalendarComponentProps {
  onDayPress: (day: { dateString: string }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDayPress }) => {
  return (
<Calendar onDayPress={onDayPress} />
    
  );
};

export default CalendarComponent;