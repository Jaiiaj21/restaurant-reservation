import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRestaurant from "@/libs/getRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import updateRestaurant from "@/libs/updateRestaurant";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const UpdateRestaurantPage = async ({ params }: { params: { rid: string } }) => {

  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null

  let profile = null
  if (session && session.user.token) profile = await getUserProfile(session.user.token)

  const handleUpdateRestaurant = async (updateRestaurantForm: FormData) => {
    'use server'
    const name = updateRestaurantForm.get("name") || ''
    const foodtype = updateRestaurantForm.get("foodtype") || ''
    const picture = updateRestaurantForm.get("picture") || ''
    const address = updateRestaurantForm.get("address") || ''
    const province = updateRestaurantForm.get("province") || ''
    const postalcode = updateRestaurantForm.get("postalcode") || ''
    const tel = updateRestaurantForm.get("tel") || ''

    const updateRestaurantResponse = await updateRestaurant(params.rid, {
      name: name as string,
      foodtype: foodtype as string,
      address: address as string,
      province: province as string,
      postalcode: postalcode as string,
      tel: tel as string,
      picture: picture as string,
      token: session.user.token
    })
    if (updateRestaurantResponse.success) {
      revalidateTag("restaurant")
      redirect(`/restaurants/${params.rid}`)
    }
  }

  return profile.data.role === "admin" ? (
    <main className="bg-slate-100 p-5 mt-[80px] mx-8">
      <form action={handleUpdateRestaurant} className="mx-8 ">

        <div className="text-2xl text-blue-700 my-3">
          Update Restaurant
        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="name">
            Restaurant Name
          </label>

          <input type='text' required id="name" name="name" placeholder="Restaurant Name" defaultValue={restaurantDetail.name}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="foodtype">
            Food Type
          </label>

          <input type='text' required id="foodtype" name="foodtype" placeholder="Food Type" defaultValue={restaurantDetail.foodtype}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="picture">
            Picture
          </label>

          <input type='text' required id="picture" name="picture" placeholder="URL" defaultValue={restaurantDetail.picture}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="address">
            Address
          </label>

          <input type='text' required id="address" name="address" placeholder="Address" defaultValue={restaurantDetail.address}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="province">
            Province
          </label>

          <input type='text' required id="province" name="province" placeholder="Province" defaultValue={restaurantDetail.province}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="postalcode">
            Postal Code
          </label>

          <input type='text' required id="postalcode" name="postalcode" placeholder="Postal Code" defaultValue={restaurantDetail.postalcode}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <div className="flex items-center w-1/2 my-2">

          <label className="w-[35%] block text-gray-700 pr-4" htmlFor="tel">
            Telephone Number
          </label>

          <input type='text' required id="tel" name="tel" placeholder="Telephone Number" defaultValue={restaurantDetail.tel}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />

        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Update Restaurant</button>

      </form>
    </main>
  ) : null
}

export default UpdateRestaurantPage
