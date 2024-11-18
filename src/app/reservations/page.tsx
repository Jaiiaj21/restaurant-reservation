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
  const reservations = await getReservations(session.user.token)
  const profile = await getUserProfile(session.user.token)

  return (
    <main className="text-center pt-[80px] h-[100vh] flex items-center flex-col">
      <Suspense fallback={<div className="flex justify-center items-center h-full"><CircularProgress color="inherit" /></div>}>
        <ReservationCollection reservationJson={reservations} role={profile.data.role} user_id={profile.data._id} token={session.user.token} />
        {/* {
          profile && profile.data.role === 'admin' &&
          <div className={`px-[20px] py-[12px] rounded-[6px] text-md text-slate-50 bg-slate-700 hover:opacity-80 active:opacity-60 disabled:opacity-60 fixed right-4 bottom-4`}>
            <Link href={'/restaurant/create'}>
              Create New Restaurant
            </Link>
          </div>
        } */}
      </Suspense>
    </main >
  )
}

export default ReservationPage;
