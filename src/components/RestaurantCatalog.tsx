'use client'; // Make sure it's a client-side component

import { useEffect, useState } from 'react'; // Use useState and useEffect hooks
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useDarkMode } from "@/contexts/DarkModeContext"; // Import dark mode context

const RestaurantCatalog = ({ restaurantJson }: { restaurantJson: Promise<RestaurantJson> }) => {
  const [restaurantJsonReady, setRestaurantJsonReady] = useState<RestaurantJson | null>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    restaurantJson.then((data) => {
      setRestaurantJsonReady(data);
    });
  }, [restaurantJson]);

  return (
    <div className={`pt-[30px] min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className={`text-3xl font-semibold text-center mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
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
