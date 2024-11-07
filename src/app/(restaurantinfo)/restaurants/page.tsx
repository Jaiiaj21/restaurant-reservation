import getRestaurants from "@/libs/getRestaurants";
import RestaurantCatalog from "@/components/RestaurantCatalog";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

const Reataurant = () => {
  const restaurants = getRestaurants();
  return (
    <main className="text-center pt-[80px] h-[100vh]">
      <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
        <RestaurantCatalog restaurantJson={restaurants} />
      </Suspense>
    </main >
  )
}

export default Reataurant;
