const getRestaurants = async () => {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/restaurants`, { next: { tags: ['restaurants'] } })
  if (!response.ok) {
    throw new Error("Failed to fetch restaurants")
  }

  const responseJson = await response.json()

  return responseJson
}

export default getRestaurants;
