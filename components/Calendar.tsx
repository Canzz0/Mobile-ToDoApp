import React from 'react';
import { Calendar } from 'react-native-calendars';

interface CalendarComponentProps {
  onDayPress: (day: { dateString: string }) => void;
  data: Array<{ id: string; date: string; value: string; additionalData: string }>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDayPress, data }) => {
  const markedDates: Record<string, any> = {};

  data.map((item) => {
    markedDates[item.date] = {
      selected: true,
      marked: true,
      selectedColor: "purple",
    };
  });


  return <Calendar onDayPress={onDayPress} markedDates={markedDates} />;
};

export default CalendarComponent;