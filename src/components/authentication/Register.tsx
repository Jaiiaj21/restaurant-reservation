"use client"
import Title from "./Title"
import RegisterViaEmail from "./RegisterViaEmail"


export default function Register() {

  return (
    <div className="flex flex-col items-center w-[305px] mt-[20px] ">
      <div className="flex flex-col w-[280px] mt-[15px]">
        <Title title="Sign up" highlightText="" highlightColor="" />

        <RegisterViaEmail />
      </div>

    </div>
  )
}
