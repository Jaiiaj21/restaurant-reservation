import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AdminRestaurantAction from "@/components/AdminRestaurantAction";
import getRestaurant from "@/libs/getRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";


const RestaurantDetailPage = async ({ params }: { params: { rid: string } }) => {

  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  const session = await getServerSession(authOptions)
  let profile = null
  if (session && session.user.token) profile = await getUserProfile(session.user.token)

  return (
    <main className="text-center p-5 relative bg-blue-50 mt-12">
      <h1 className="text-2xl font-mendium">{restaurantDetail.name}</h1>
      <div className="flex flex-row my-5" key={params.rid}>
        <Image src={restaurantDetail.picture} alt="Restaurant Image" width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"></Image>
        <div className="text-md mx-5 text-left">
          <div className="text-md mx-5">
            Food Type: {restaurantDetail.foodtype}
          </div>
          <div className="text-md mx-5">
            Address: {restaurantDetail.address}
          </div>
          <div className="text-md mx-5">
            Province: {restaurantDetail.province}
          </div>
          <div className="text-md mx-5">
            Postal Code: {restaurantDetail.postalcode}
          </div>
          <div className="text-md mx-5">
            Tel: {restaurantDetail.tel}
          </div>
          <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm mx-5 my-3">
            <Link href={session ? `/reservations/create?id=${params.rid}&name=${restaurantDetail.name}` : `/login`}>
              Booking restaurant
            </Link>
          </button>
        </div>
      </div>
      {
        profile && profile.data.role === "admin" &&
        <AdminRestaurantAction id={params.rid} token={session?.user.token} />
      }
    </main>
  )
}

export default RestaurantDetailPage;
