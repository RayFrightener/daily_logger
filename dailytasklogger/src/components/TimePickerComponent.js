import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Styles from '@/styles/TimePickerComponent.module.css';
import { TextField } from '@mui/material';

export default function TimePickerComponent( { startTime, setStartTime, endTime, setEndTime }) {
 return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={Styles.timePickerContainer}>
        <div className={Styles.timePickerWrapper}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className={Styles.timePickerWrapper}>
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue) =>  setEndTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </LocalizationProvider>
  );  
}