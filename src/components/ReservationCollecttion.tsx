import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const ReservationCollection = async ({ reservationJson, role, user_id }: { reservationJson: Promise<ReservationJson>, role: string, user_id: string }) => {
  const restaurantJsonReady = await reservationJson
  return (
    <>
      <h1 className="text-2xl">
        Manage Reservation
      </h1>
      <div className="m-[20px] flex flex-wrap justify-around items-around text-left">
        {
          restaurantJsonReady.data.map((reservationItem: ReservationItem) => {
            if (role === "admin" || (role === "user" && user_id === reservationItem.user)) {
              return (
                <div key={reservationItem._id} className="bg-slate-200 rounded p-5 w-[80%] my-3 relative">
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
                  <div className="absolute right-2 bottom-2 flex items-center">
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm m-3">
                      <Link href={`/reservations/update/${reservationItem._id}?name=${reservationItem.restaurant?.name}`}>
                        Update reservation
                      </Link>
                    </button>
                    <button className="block rounded-md bg-red-600 hover:bg-red-400 px-3 py-2 text-white shadow-sm m-3"

                    >
                      Delete restaurant
                    </button>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </>
  );
}

export default ReservationCollection;
