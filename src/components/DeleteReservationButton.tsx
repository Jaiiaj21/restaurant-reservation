'use client'
import deleteReservation from "@/libs/deleteReservation";
import { useRouter } from "next/navigation";

const DeleteReservationButton = ({ id, token }: { id: string; token: string; }) => {

  const router = useRouter()

  const handleDelete = async () => {
    const deleteResponse = await deleteReservation(id, token);
    if (deleteResponse.success) {
      router.push('/reservations')
      router.refresh()
    }
  };

  return (
    <button
      className="block rounded-md bg-red-600 hover:bg-red-400 px-3 py-2 text-white shadow-sm m-3"
      onClick={handleDelete}
    >
      Delete reservation
    </button>
  )
}

export default DeleteReservationButton;
