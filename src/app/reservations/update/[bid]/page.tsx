'use client'

import DateReservation from "@/components/DateReserve"
import updateReservation from "@/libs/updateReservation"
import dayjs, { Dayjs } from "dayjs"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const updateReservationPage = ({ params }: { params: { bid: string } }) => {

  const router = useRouter()
  const urlParams = useSearchParams()
  const restaurantName = urlParams.get("name")

  const session = useSession()
  if (!session || !session.data?.user.token) return null

  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
  const [numOfGuest, setNumOfGuest] = useState(0)

  const handleUpdateReservation = async () => {
    if (bookingDate && numOfGuest) {
      const updateResponse = await updateReservation({
        id: params.bid,
        bookingDate: dayjs(bookingDate).format("YYYY/MM/DD"),
        numOfGuest: numOfGuest,
        token: session.data.user.token
      })

      if (updateResponse.success) {
        router.push('/reservations')
        router.refresh()
      }
    }
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 mt-[80px] justify-center">

      <div className="text-xl font-medium">
        New Reservation
      </div>
      <div className="text-xl font-medium">
        Restaurant: {restaurantName}
      </div>

      <div className="w-1/3 space-y-3 flex flex-col">
        <div className="text-md text-left text-gray-600">Pick-Up Booking Date</div>
        <DateReservation
          bookingDate={bookingDate}
          onDateChange={(value: Dayjs) => setBookingDate(value)}
        />

        <div className="w-full">

          <label className="w-auto block text-gray-700 pr-4 pb-2" htmlFor="numOfGuest">
            Number of Guest
          </label>

          <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-full px-10 py-5 flex flex-row justify-center">
            <input type='number' required id="numOfGuest" name="numOfGuest" placeholder="0" min={0} max={50} value={numOfGuest} onChange={(event) => setNumOfGuest(parseInt(event.target.value, 10))}
              className="w-full px-3 bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
          </div>

        </div>

      </div>

      <div className="w-1/3 flex">
        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm mt-3" onClick={handleUpdateReservation}>
          Update Restaurant
        </button>

      </div>
    </main>
  );
}

export default updateReservationPage;
