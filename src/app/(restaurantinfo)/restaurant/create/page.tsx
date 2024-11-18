import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import createRestaurant from "@/libs/createRestaurant";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const CreateRestaurantPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  let profile = null;
  if (session && session.user.token) profile = await getUserProfile(session.user.token);

  const handleCreateNew = async (addRestaurantForm: FormData) => {
    'use server';
    const name = addRestaurantForm.get("name") || '';
    const foodtype = addRestaurantForm.get("foodtype") || '';
    const picture = addRestaurantForm.get("picture") || '';
    const address = addRestaurantForm.get("address") || '';
    const province = addRestaurantForm.get("province") || '';
    const postalcode = addRestaurantForm.get("postalcode") || '';
    const tel = addRestaurantForm.get("tel") || '';

    const addNewRestaurantResponse = await createRestaurant({
      name: name as string,
      foodtype: foodtype as string,
      address: address as string,
      province: province as string,
      postalcode: postalcode as string,
      tel: tel as string,
      picture: picture as string,
      token: session.user.token
    });
    if (addNewRestaurantResponse.success) {
      revalidateTag("restaurants");
      redirect("/restaurants");
    }
  };

  return profile.data.role === "admin" ? (
    <main className="pt-[80px] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
      <form action={handleCreateNew} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-6">Create New Restaurant</h2>

        <div className="space-y-4">
          {[
            { label: "Restaurant Name", name: "name", type: "text", placeholder: "Restaurant Name" },
            { label: "Food Type", name: "foodtype", type: "text", placeholder: "Food Type" },
            { label: "Picture URL", name: "picture", type: "text", placeholder: "Image URL" },
            { label: "Address", name: "address", type: "text", placeholder: "Address" },
            { label: "Province", name: "province", type: "text", placeholder: "Province" },
            { label: "Postal Code", name: "postalcode", type: "text", placeholder: "Postal Code" },
            { label: "Telephone Number", name: "tel", type: "text", placeholder: "Telephone Number" }
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex items-center space-x-4">
              <label htmlFor={name} className="w-1/3 text-gray-700 dark:text-gray-300">{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                required
                className="w-2/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Restaurant
        </button>
      </form>
    </main>
  ) : null;
};

export default CreateRestaurantPage;
