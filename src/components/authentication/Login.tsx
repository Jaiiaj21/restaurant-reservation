"use client";
import Title from "./Title";
import LoginViaEmail from "./LoginViaEmail";

export default function Login() {
  return (
    <div className="flex flex-col w-[300px] mt-[40px]">
      <Title title="Sign in" highlightText="" highlightColor="" />

      {/* Login via Email Component */}
      <LoginViaEmail />
    </div>
  );
}
