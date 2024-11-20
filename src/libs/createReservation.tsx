
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

  const res = await response.json();

  if (!response.ok && !res.message.includes('has already made 3 bookings')) {
    console.error('Error during create new reservation:', response);
    throw new Error("Failed to create new reservation")
  }

  return res
}

export default createReservation;
