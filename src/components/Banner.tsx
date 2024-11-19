'use client'
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Banner = () => {
  const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
      >
        <source src="/videos/restaurant-background.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

       <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative text-center mb-12 z-10">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Welcome to PJ Restaurant Reservations
          </h1>
          <p className="text-lg text-white mb-6 max-w-xl mx-auto leading-relaxed ">
            Book your table in advance and enjoy a seamless dining experience.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={(e) => { e.stopPropagation(); router.push('/restaurants'); }}>
            Book Now !
          </button>
        </div>
    </div>
  );
}

export default Banner;
