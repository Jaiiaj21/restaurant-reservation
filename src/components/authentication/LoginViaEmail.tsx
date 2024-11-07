import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
import { signIn } from "next-auth/react"
import PrimaryButton from "@/components/authentication/PrimaryButton"

type Error = {
  email: string
  password: string
}

type Form = {
  email: string
  password: string
}

export default function LoginViaEmail() {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Error>({
    email: "",
    password: "",
  })

  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const validateForm = () => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    // const password_pattern = /^.{8}$/
    let success = true
    const errors: Error = {
      email: "",
      password: "",
    }
    if (form.email === "" || form.password === "") {
      errors.email = form.email === "" ? "Please enter your email" : ""
      errors.password = form.password === "" ? "Please enter your password" : ""
      success = false
    } else if (false) { //email is not in database
      errors.email = "Please enter a valid email address"
      success = false
    } else if (false) {
      errors.password = "Invalid password"
      success = false
    }

    return { errors, success }
  }

  const handleValidation = async () => {
    // event.preventDefault()
    // console.log(event.target)
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);
    const { errors, success } = validateForm()
    if (!success) {
      setTimeout(() => {
        setErrors(errors)
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
      }, 1000);
      return
    } else {
      signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/mybill",
      })

    }
  }

  return (
    <form className="mt-[10px] w-full" action={handleValidation} noValidate>
      {/* Email Input Component */}
      <Input
        name="email"
        label="Email"
        inputType="text"
        warning={errors.email}
        handleChange={handleChange}
        value={form.email}
      />

      {/* Password Input Component */}
      <PasswordInput
        fromLoginPage={true}
        handleChange={handleChange}
        value={form.password}
        warning={errors.password}
      />

      <PrimaryButton
        type="submit"
        isDisabled={isDisabled}
        className="w-full bg-[#334155] hover:bg-slate-600 text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-base md:text-lg"
        isLoading={primaryLoading}
        loadingMessage="Waiting"
      >
        Sign in
      </PrimaryButton>

      <p className="w-full text-center text-sm mt-[10px]">
        No account? {" "}
        <Link
          href={"/register"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2">
          Create account
        </Link>
      </p>
    </form>
  )
}
