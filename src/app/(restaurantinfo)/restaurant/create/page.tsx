import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import createRestaurant from "@/libs/createRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CreateRestaurantPage = async () => {

  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null

  const profile = await getUserProfile(session.user.token)
  if (!profile) return null

  const createNew = async (addRestaurantForm: FormData) => {
    'use server'
    const name = addRestaurantForm.get("name") || ''
    const foodtype = addRestaurantForm.get("foodtype") || ''
    const picture = addRestaurantForm.get("picture") || ''
    const address = addRestaurantForm.get("address") || ''
    const province = addRestaurantForm.get("province") || ''
    const postalcode = addRestaurantForm.get("postalcode") || ''
    const tel = addRestaurantForm.get("tel") || ''

    const addNewRestaurant = await createRestaurant({
      name: name as string,
      foodtype: foodtype as string,
      address: address as string,
      province: province as string,
      postalcode: postalcode as string,
      tel: tel as string,
      picture: picture as string,
      token: session.user.token
    })
    if (addNewRestaurant.success) {
      redirect("/restaurants")
    }
  }

  return (
    <main className="bg-slate-100 p-5 mt-[80px] mx-8">
      {
        (profile.data.role === "admin") ?
          <form action={createNew} className="mx-8 ">

            <div className="text-2xl text-blue-700 my-3">
              Create New Restaurant
            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="name">
                Restaurant Name
              </label>

              <input type='text' required id="name" name="name" placeholder="Restaurant Name"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="foodtype">
                Food Type
              </label>

              <input type='text' required id="foodtype" name="foodtype" placeholder="Food Type"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="picture">
                Picture
              </label>

              <input type='text' required id="picture" name="picture" placeholder="URL"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="address">
                Address
              </label>

              <input type='text' required id="address" name="address" placeholder="Address"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="province">
                Province
              </label>

              <input type='text' required id="province" name="province" placeholder="Province"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="postalcode">
                Postal Code
              </label>

              <input type='text' required id="postalcode" name="postalcode" placeholder="Postal Code"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <div className="flex items-center w-1/2 my-2">

              <label className="w-[35%] block text-gray-700 pr-4" htmlFor="tel">
                Telephone Number
              </label>

              <input type='text' required id="tel" name="tel" placeholder="Telephone Number"
                className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Restaurant</button>

          </form>
          : null
      }
    </main>
  )
}

export default CreateRestaurantPage
