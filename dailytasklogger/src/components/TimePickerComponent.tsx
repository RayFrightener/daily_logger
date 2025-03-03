import * as React from 'react';
import Styles from '@/styles/TimePickerComponent.module.css';
//components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface TimePickerComponentProps {
  startTime: any;
  setStartTime: (time: any) => void;
  endTime: any;
  setEndTime: (time: any) => void;
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ( { startTime, setStartTime, endTime, setEndTime }) => {
 return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={Styles.timePickerContainer}>
        <div className={Styles.timePickerWrapper}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
            />
        </div>
        <div className={Styles.timePickerWrapper}>
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue) =>  setEndTime(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );  
};

export default TimePickerComponent;