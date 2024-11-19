'use client'
import deleteRestaurant from "@/libs/deleteRestaurant";
import Link from "next/link"
import { useRouter } from "next/navigation";

const AdminRestaurantAction = ({ id, token }: { id: string, token: string }) => {

  const router = useRouter()

  const handleDelete = async () => {
    const deleteResponse = await deleteRestaurant(id, token);
    if (deleteResponse.success) {
      router.push('/restaurants');
      router.refresh();
    }
  }

  return (
    <div className="absolute right-2 bottom-2 flex items-center">
      <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700 px-3 py-2 text-white shadow-sm m-3">
        <Link href={`/restaurant/update/${id}`}>
          Update restaurant
        </Link>
      </button>
      <button className="block rounded-md bg-red-600 hover:bg-red-400 px-3 py-2 text-white shadow-sm m-3"
        onClick={handleDelete}
      >
        Delete restaurant
      </button>
    </div>
  )
}

export default AdminRestaurantAction;
