import DeleteReservationButton from "@/components/DeleteReservationButton";
import Link from "next/link";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

interface ReservationCollectionProps {
  reservationJson: Promise<ReservationJson>;
  role: string;
  user_id: string;
  token: string;
}

const ReservationCollection = async ({ reservationJson, role, user_id, token }: ReservationCollectionProps) => {
  const reservationJsonReady = await reservationJson;

  const reservationList = reservationJsonReady.data
  reservationList.sort((a, b) => a.user.name.localeCompare(b.user.name))

  if (reservationJsonReady.count === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-2xl text-gray-600 font-semibold mb-4 dark:text-gray-200">No Reservations Found</p>
        <CalendarIcon className="w-16 h-16 text-gray-300" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-gray-200">Manage Reservations</h1>
      <div className="flex flex-wrap justify-center gap-6 p-4 ">
        {reservationList.map((reservationItem: ReservationItem) => {
          if (role === "admin" || (role === "user" && user_id === reservationItem.user._id)) {
            return (
              <div
                key={reservationItem._id}
                className="bg-white rounded-lg shadow-md p-6 w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-lg
                          dark:bg-gray-800"
              >
                <div className="flex items-center mb-4">
                  <UserIcon className="h-6 w-6 text-gray-500 mr-2" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200">User: {reservationItem.user.name}</p>
                </div>

                <div className="text-gray-600 mb-2 dark:text-gray-200">
                  <p className="font-semibold">Restaurant Name:</p>
                  <p className="text-gray-800 dark:text-gray-400">{reservationItem.restaurant?.name}</p>
                </div>
                <div className="text-gray-600 mb-2 dark:text-gray-200">
                  <p className="font-semibold">Restaurant Address:</p>
                  <p className="text-gray-800 dark:text-gray-400">{reservationItem.restaurant?.address}</p>
                </div>
                <div className="text-gray-600 mb-2 dark:text-gray-200">
                  <p className="font-semibold">Booking Date:</p>
                  <p className="text-gray-800 dark:text-gray-400">{new Date(reservationItem.bookingDate).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div className="text-gray-600 mb-4 dark:text-gray-200">
                  <p className="font-semibold">Number of Guests:</p>
                  <p className="text-gray-800 dark:text-gray-400">{reservationItem.numOfGuests}</p>
                </div>

                <div className="flex justify-between mt-6">
                  <Link href={`/reservations/update/${reservationItem._id}?name=${reservationItem.restaurant?.name}`}
                    className="block rounded-md text-white px-3 py-2 bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700 transition-colors shadow-sm m-3">
                    Update
                  </Link>
                  <DeleteReservationButton id={reservationItem._id} token={token} />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default ReservationCollection;
