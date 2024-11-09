const getReservations = async (token: string) => {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/bookings`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    next: { tags: ['reservations'] }
  })
  if (!response.ok) {
    throw new Error("Failed to fetch reservations")
  }

  const responseJson = await response.json()

  return responseJson
}

export default getReservations;
