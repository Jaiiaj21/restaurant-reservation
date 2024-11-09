import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const ReservationCollection = async ({ reservationJson }: { reservationJson: Promise<ReservationJson> }) => {
  const restaurantJsonReady = await reservationJson
  return (
    <>
      <h1 className="text-2xl">
        Manage Reservation
      </h1>
      <div className="m-[20px] flex flex-wrap justify-around items-around text-left">
        {
          restaurantJsonReady.data.map((reservationItem: ReservationItem) => {
            return (
              <div key={reservationItem._id} className="bg-slate-200 rounded p-5 w-[80%] my-3">
                <div className="text-xl">
                  User: {reservationItem.user}
                </div>
                <div className="text-xl">
                  Restaurant Name: {reservationItem.restaurant?.name}
                </div>
                <div className="text-xl">
                  Restaurant Address: {reservationItem.restaurant?.address}
                </div>
                <div className="text-xl">
                  Booking Date: {reservationItem.bookingDate}
                </div>
                <div className="text-xl">
                  Number of Guest: {reservationItem.numOfGuests}
                </div>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm mt-5">
                  Remove from Cart
                </button>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default ReservationCollection;
