
const userLogin = async (userEmail: string, userPassword: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to log-in")
  }

  return await response.json()
}

export default userLogin;
