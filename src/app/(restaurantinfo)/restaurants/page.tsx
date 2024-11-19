import getRestaurants from "@/libs/getRestaurants";
import RestaurantCatalog from "@/components/RestaurantCatalog";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

const Restaurant = async () => {
  const restaurants = getRestaurants();
  const session = await getServerSession(authOptions);
  const profile = session && session.user.token ? await getUserProfile(session.user.token) : null;

  return (
    <main className="text-center pt-[50px] h-[100vh] bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
      <Suspense fallback={<div className="flex justify-center items-center h-full"><CircularProgress color="inherit" /></div>}>
        <RestaurantCatalog restaurantJson={restaurants} />
        {profile?.data.role === 'admin' && (
          <div className="px-6 py-3 rounded-md text-md text-slate-50 fixed right-4 bottom-4 shadow-lg transition-opacity
                          dark:text-slate-50 bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700">
            <Link href={'/restaurant/create'}>
              Create New Restaurant
            </Link>
          </div>
        )}
      </Suspense>
    </main>
  );
};

export default Restaurant;
