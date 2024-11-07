import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRestaurant from "@/libs/getRestaurant";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const RestaurantDetailPage = async ({ params }: { params: { rid: string } }) => {

  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  const session = await getServerSession(authOptions)

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-mendium">{restaurantDetail.name}</h1>
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
          <Link href={session ? `/booking/?id=${params.rid}&model=${restaurantDetail.name}` : `/login`}>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
              Booking restaurant
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default RestaurantDetailPage;
