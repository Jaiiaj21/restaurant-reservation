
const deleteReservation = async (id: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
  if (!response.ok) {
    throw new Error("Failed to delete reservation")
  }

  const json = await response.json()

  return json
}

export default deleteReservation;
