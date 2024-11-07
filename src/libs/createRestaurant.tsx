
const createRestaurant = async ({
  name,
  foodtype,
  address,
  province,
  postalcode,
  tel,
  picture,
  token,
}: {
  name: string
  foodtype: string
  address: string
  province: string
  postalcode: string
  tel: string
  picture: string
  token: string
}) => {

  const formData = {
    name: name,
    foodtype: foodtype,
    address: address,
    province: province,
    postalcode: postalcode,
    tel: tel,
    picture: picture
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ...formData })
  })

  if (!response.ok) {
    console.error('Error during register:', response);
    throw new Error("Failed to register")
  }

  const res = await response.json();

  return res
}

export default createRestaurant;
