import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AdminRestaurantAction from "@/components/AdminRestaurantAction";
import getRestaurant from "@/libs/getRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const RestaurantDetailPage = async ({ params }: { params: { rid: string } }) => {
  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  const session = await getServerSession(authOptions);
  const profile = session?.user.token ? await getUserProfile(session.user.token) : null;

  return (
    <main className="h-[100vh] text-center p-5 bg-blue-50 mt-12 dark:bg-gray-900">
      <h1 className="text-3xl font-medium text-gray-800 mb-6 dark:text-gray-200">{restaurantDetail.name}</h1>
      
      <div className="flex flex-col md:flex-row items-center md:items-start my-5" key={params.rid}>
        <Image
          src={restaurantDetail.picture}
          alt="Restaurant Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[80%] md:w-[30%] object-cover mb-4 md:mb-0"
        />

        <div className="text-md mx-5 text-left border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
          <p className="dark:text-gray-200">Food Type: <span className="text-gray-700 dark:text-gray-400">{restaurantDetail.foodtype}</span></p>
          <p className="dark:text-gray-200">Address: <span className="text-gray-700 dark:text-gray-400">{restaurantDetail.address}</span></p>
          <p className="dark:text-gray-200">Province: <span className="text-gray-700 dark:text-gray-400">{restaurantDetail.province}</span></p>
          <p className="dark:text-gray-200">Postal Code: <span className="text-gray-700 dark:text-gray-400">{restaurantDetail.postalcode}</span></p>
          <p className="dark:text-gray-200">Tel: <span className="text-gray-700 dark:text-gray-400">{restaurantDetail.tel}</span></p>

          <Link href={session ? `/reservations/create?id=${params.rid}&name=${restaurantDetail.name}` : `/login`}>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 dark:bg-sky-700 dark:hover:bg-indigo-700 px-3 py-2 text-white shadow-sm mt-4"
              aria-label="Book this restaurant"
            >
              Book Restaurant
            </button>
          </Link>
        </div>
      </div>

      {profile?.data.role === "admin" && (
        <AdminRestaurantAction id={params.rid} token={session?.user.token} />
      )}
    </main>
  );
};

export default RestaurantDetailPage;
