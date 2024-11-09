
const createReservation = async ({
  id,
  bookingDate,
  numOfGuest,
  token,
}: {
  id: string
  bookingDate: string
  numOfGuest: number
  token: string
}) => {

  const formData = {
    bookingDate: bookingDate,
    numOfGuests: numOfGuest
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/restaurants/${id}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ...formData })
  })

  if (!response.ok) {
    console.error('Error during create new reservation:', response);
    throw new Error("Failed to create new reservation")
  }

  const res = await response.json();

  return res
}

export default createReservation;
