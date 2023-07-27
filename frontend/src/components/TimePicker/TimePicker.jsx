import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useDateContext } from '../../App';

export const TimePicker = ({ name, label, required }) => {
  const { setFieldValue } = useFormikContext();
  const [isoTime, setIsoTime] = useState('');
  const [time, setTime] = useState('');
  const { selectedDay } = useDateContext();

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    const convertToIsoTime = (selectedDay, timeStr) => {
      const [hour, minute] = timeStr.split(':');
      const now = new Date(selectedDay);
      const isoTimeStr = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${hour}:${minute}`;
      return isoTimeStr;
    };

    const isoTime = convertToIsoTime(selectedDay, time);
    setIsoTime(isoTime);

    setFieldValue(name, time === '' ? '' : isoTime);
  }, [selectedDay, time, name, setFieldValue]);

  return (
    <div className="mt-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="time"
        id={name}
        name={name}
        value={time}
        onChange={handleTimeChange}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input type="hidden" name={name} value={isoTime} />
    </div>
  );
};
