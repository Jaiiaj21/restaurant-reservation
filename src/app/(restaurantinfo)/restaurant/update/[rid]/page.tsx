import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRestaurant from "@/libs/getRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import updateRestaurant from "@/libs/updateRestaurant";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const UpdateRestaurantPage = async ({ params }: { params: { rid: string } }) => {
  const restaurantDetail: RestaurantItem = await getRestaurant(params.rid);

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  let profile = null;
  if (session && session.user.token) profile = await getUserProfile(session.user.token);

  const handleUpdateRestaurant = async (updateRestaurantForm: FormData) => {
    'use server';
    const name = updateRestaurantForm.get("name") || '';
    const foodtype = updateRestaurantForm.get("foodtype") || '';
    const picture = updateRestaurantForm.get("picture") || '';
    const address = updateRestaurantForm.get("address") || '';
    const province = updateRestaurantForm.get("province") || '';
    const postalcode = updateRestaurantForm.get("postalcode") || '';
    const tel = updateRestaurantForm.get("tel") || '';

    const updateRestaurantResponse = await updateRestaurant(params.rid, {
      name: name as string,
      foodtype: foodtype as string,
      address: address as string,
      province: province as string,
      postalcode: postalcode as string,
      tel: tel as string,
      picture: picture as string,
      token: session.user.token
    });
    if (updateRestaurantResponse.success) {
      revalidateTag("restaurant");
      redirect(`/restaurants/${params.rid}`);
    }
  };

  return profile.data.role === "admin" ? (
    <main className="pt-[80px] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 h-dvh">
      <form action={handleUpdateRestaurant} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-6">Update Restaurant</h2>

        <div className="space-y-4">
          {[
            { label: "Restaurant Name", name: "name", type: "text", placeholder: "Restaurant Name", defaultValue: restaurantDetail.name },
            { label: "Food Type", name: "foodtype", type: "text", placeholder: "Food Type", defaultValue: restaurantDetail.foodtype },
            { label: "Picture URL", name: "picture", type: "text", placeholder: "Picture URL", defaultValue: restaurantDetail.picture },
            { label: "Address", name: "address", type: "text", placeholder: "Address", defaultValue: restaurantDetail.address },
            { label: "Province", name: "province", type: "text", placeholder: "Province", defaultValue: restaurantDetail.province },
            { label: "Postal Code", name: "postalcode", type: "text", placeholder: "Postal Code", defaultValue: restaurantDetail.postalcode },
            { label: "Telephone Number", name: "tel", type: "text", placeholder: "Telephone Number", defaultValue: restaurantDetail.tel }
          ].map(({ label, name, type, placeholder, defaultValue }) => (
            <div key={name} className="flex items-center space-x-4">
              <label htmlFor={name} className="w-1/3 text-gray-700 dark:text-gray-300">{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                required
                defaultValue={defaultValue}
                className="w-2/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-sky-600 hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Restaurant
        </button>
      </form>
    </main>
  ) : null;
};

export default UpdateRestaurantPage;
