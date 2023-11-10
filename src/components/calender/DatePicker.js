import * as React from 'react';
import { useState } from 'react';  // Import useState
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null); // Initialize selectedDate state

 
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate); // Notify the parent component of the date change
    }
  };

  return (
      <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        views={['year', 'month']}
        value={selectedDate} // Pass selectedDate as the value
        onChange={handleDateChange} // Handle date changes
        />
    </LocalizationProvider>
        </div>
  );
}






