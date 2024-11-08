import getRestaurants from "@/libs/getRestaurants";
import RestaurantCatalog from "@/components/RestaurantCatalog";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

const Reataurant = async () => {
  const restaurants = getRestaurants();
  const session = await getServerSession(authOptions)
  let profile = null
  if (session && session.user.token) profile = await getUserProfile(session.user.token)


  return (
    <main className="text-center pt-[80px] h-[100vh]">
      <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
        <RestaurantCatalog restaurantJson={restaurants} />
        {
          profile && profile.data.role === 'admin' &&
          <div className={`px-[20px] py-[12px] rounded-[6px] text-md text-slate-50 bg-slate-700 hover:opacity-80 active:opacity-60 disabled:opacity-60 fixed right-4 bottom-4`}>
            <Link href={'/restaurant/create'}>
              Create New Restaurant
            </Link>
          </div>
        }
      </Suspense>
    </main >
  )
}

export default Reataurant;
