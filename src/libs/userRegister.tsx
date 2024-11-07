
const userRegister = async ({
  name,
  tel,
  email,
  password,
}: {
  name: string
  tel: string
  email: string
  password: string
}) => {
  const formData = { name: name, tel: tel, email: email, role: 'user', password: password }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...formData })
  })

  if (!response.ok) {
    console.error('Error during register:', response);
    throw new Error("Failed to register")
  }

  const user = await response.json();

  return user
}

export default userRegister;
