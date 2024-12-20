import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const RestaurantCatalog = async ({ restaurantJson }: { restaurantJson: Promise<RestaurantJson> }) => {
  const restaurantJsonReady = await restaurantJson

  return (
    <div className="pt-[30px] min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
        Explore {restaurantJsonReady?.count} restaurants in our catalog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6">
        {
          restaurantJsonReady?.data.map((restaurant: RestaurantItem) => {
            return (
              <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id} className="w-full p-4">
                <ProductCard
                  name={restaurant.name}
                  imgSrc={restaurant.picture}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  );
};

export default RestaurantCatalog;
