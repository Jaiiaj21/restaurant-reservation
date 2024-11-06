import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const RestaurantCatalog = async ({ restaurantJson }: { restaurantJson: Promise<RestaurantJson> }) => {
  const restaurantJsonReady = await restaurantJson
  return (
    <>
      <h1 className="text-2xl">
        Explore {restaurantJsonReady.count} restaurants in our catalog
      </h1>
      <div style={{
        margin: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around"
      }}>
        {
          restaurantJsonReady.data.map((restaurant: RestaurantItem) => {
            return (
              <Link href={`/restaurants/${restaurant.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={restaurant.id}>
                <ProductCard
                  name={restaurant.name}
                  imgSrc={restaurant.picture}
                />
              </Link>
            )
          })
        }
      </div>
    </>
  );
}

export default RestaurantCatalog;
