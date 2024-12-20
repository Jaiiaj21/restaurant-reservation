'use client'

import DateReservation from "@/components/DateReserve"
import createReservation from "@/libs/createReservation"
import dayjs, { Dayjs } from "dayjs"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const createReservationPage = () => {

  const urlParams = useSearchParams()
  const rid = urlParams.get('id')
  const restaurantName = urlParams.get('name')
  const router = useRouter()

  const session = useSession()
  if (!session || !session.data?.user.token) return null

  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
  const [numOfGuest, setNumOfGuest] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const makeReservation = async () => {
    if (rid && restaurantName && bookingDate && numOfGuest) {
      const createResponse = await createReservation({
        id: rid,
        bookingDate: dayjs(bookingDate).format("YYYY/MM/DD"),
        numOfGuest: numOfGuest,
        token: session.data.user.token
      })

      if (createResponse.success) {
        router.push('/reservations')
        router.refresh()
      } else if (createResponse.message && createResponse.message.includes('has already made 3 bookings')) {
        setErrorMessage('You has already made 3 bookings')
      } else if (!createResponse.success) {
        setErrorMessage('Can not booking. Please contact admin')
      }
    }
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 dark:bg-gray-900 h-full min-h-screen">

      <div className="text-xl font-medium dark:text-gray-200 mt-20">
        New Reservation
      </div>
      <div className="text-xl font-medium dark:text-gray-400">
        Restaurant: {restaurantName}
      </div>

      <div className="w-1/3 space-y-3 flex flex-col">
        <div className="text-md text-left text-gray-600 dark:text-gray-400">Pick-Up Booking Date</div>
        <DateReservation
          bookingDate={bookingDate}
          onDateChange={(value: Dayjs) => setBookingDate(value)}
        />

        <div className="w-full">

          <label className="w-auto block text-gray-700 pr-4 pb-2 dark:text-gray-400" htmlFor="numOfGuest">
            Number of Guest
          </label>

          <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-full px-10 py-5 flex flex-row justify-center dark:bg-gray-900">
            <input type='number' required id="numOfGuest" name="numOfGuest" placeholder="0" min={0} max={50} value={numOfGuest} onChange={(event) => setNumOfGuest(parseInt(event.target.value, 10))}
              className="w-full px-3 bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400 dark:bg-gray-200" />
          </div>

        </div>

      </div>

      <div className="w-1/3 flex justify-center">
        <button className="block w-full rounded-md bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700 px-4 py-3 text-white shadow-lg mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={makeReservation}>
          Reserve this Restaurant
        </button>

      </div>

      {errorMessage && (
        <p className="mt-[5px] text-sm leading-5 text-[#EA4335] dark:text-[#fcb1b1]">{errorMessage}</p>
      )}
    </main>
  );
}

export default createReservationPage;
