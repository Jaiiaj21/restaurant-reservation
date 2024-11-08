
const getRestaurant = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/restaurants/${id}`, { next: { tags: ['restaurant'] } })
  if (!response.ok) {
    throw new Error("Failed to fetch restaurant")
  }

  const json = await response.json()
  return json.data
}

export default getRestaurant;
