import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ReservationCollection from "@/components/ReservationCollecttion";
import getReservations from "@/libs/getReservations";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

const ReservationPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null
  const reservations = getReservations(session.user.token)
  const profile = await getUserProfile(session.user.token)

  return (
    <main className="text-center pt-[80px] h-full flex items-center flex-col dark:bg-gray-900 min-h-screen">
      <Suspense fallback={<div className="flex justify-center items-center h-[90vh]"><CircularProgress color="inherit" /></div>}>
        <ReservationCollection reservationJson={reservations} role={profile.data.role} user_id={profile.data._id} token={session.user.token} />
        <div className="px-6 py-3 rounded-md text-md text-slate-50 fixed right-4 bottom-4 shadow-lg transition-opacity
                          dark:text-slate-50 bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700">
          <Link href={'/restaurants'}>
            Create New Reservation
          </Link>
        </div>
      </Suspense>
    </main >
  )
}

export default ReservationPage;
