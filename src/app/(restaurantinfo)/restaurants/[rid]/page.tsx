import getRestaurant from "@/app/libs/getRestaurant";
import Image from "next/image";
import Link from "next/link";

const RestaurantDetailPage = async ({ params }: { params: { rid: string } }) => {

  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  /**
   * Mock Data for Demontration Only
   */

  /*const mockCarRepo = new Map();
  mockCarRepo.set("001", { name: "civic", image: "/img/civic.jpg" })
  mockCarRepo.set("002", { name: "fortuner", image: "/img/fortuner.jpg" })
  mockCarRepo.set("003", { name: "tesla", image: "/img/tesla.jpg" })
  mockCarRepo.set("004", { name: "dream car", image: "/img/car1.jpg" })
  */

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
          <Link href={`/booking/?id=${params.rid}&model=${restaurantDetail.name}`}>
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
