
const deleteRestaurant = async (id: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/restaurants/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
  if (!response.ok) {
    throw new Error("Failed to delete restaurant")
  }

  const json = await response.json()

  return json
}

export default deleteRestaurant;
