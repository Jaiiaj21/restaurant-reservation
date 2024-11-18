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
    <main className="text-center p-5 bg-blue-50 mt-12">
      <h1 className="text-3xl font-medium text-gray-800 mb-6">{restaurantDetail.name}</h1>
      
      <div className="flex flex-col md:flex-row items-center md:items-start my-5" key={params.rid}>
        <Image
          src={restaurantDetail.picture}
          alt="Restaurant Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[80%] md:w-[30%] object-cover mb-4 md:mb-0"
        />
        
        <div className="text-md mx-5 text-left border border-gray-200 p-4 rounded-lg shadow-sm bg-white">
          <p>Food Type: <span className="text-gray-700">{restaurantDetail.foodtype}</span></p>
          <p>Address: <span className="text-gray-700">{restaurantDetail.address}</span></p>
          <p>Province: <span className="text-gray-700">{restaurantDetail.province}</span></p>
          <p>Postal Code: <span className="text-gray-700">{restaurantDetail.postalcode}</span></p>
          <p>Tel: <span className="text-gray-700">{restaurantDetail.tel}</span></p>

          <Link href={session ? `/reservations/create?id=${params.rid}&name=${restaurantDetail.name}` : `/login`}>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm mt-4"
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
