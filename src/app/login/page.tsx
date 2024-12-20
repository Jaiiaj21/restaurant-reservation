import Logo from '@/components/authentication/Logo';
import Login from '@/components/authentication/Login';

export default function LoginPage() {

  return (
    <main className="w-full flex flex-col items-center bg-[#F8FAFC] min-h-screen flex justify-center">
      {/* Logo Component */}
      <div className="flex flex-col items-center w-[400px] md:bg-white md:shadow-xl pb-[50px]">
        <Logo imgSrc="/img/PJ_Restaurant_Reservation_Logo.jpg" />
        <Login />
      </div>
    </main>
  );
}
