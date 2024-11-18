'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const DateReserve = ({
  bookingDate,
  onDateChange
}: {
  bookingDate: Dayjs | null
  onDateChange: Function
}) => {


  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-full px-10 py-5 flex flex-row justify-center dark:bg-gray-900">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className="bg-white w-full rounded-md dark:bg-gray-200 " value={bookingDate} onChange={(value) => { onDateChange(value); }} />
      </LocalizationProvider>
    </div >
  )
}

export default DateReserve;
