'use client'
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Banner = () => {
  const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  return (
    <div className="block p-1 m-0 w-screen h-[100vh] relative" onClick={() => { setIndex(index + 1); console.log(index); }}>
      <Image
        src={covers[index % 3]}
        alt="cover"
        fill
        className="object-cover"
      />
      <div className="relative top-[100px] z-20 text-center">
        <h1 className="text-4xl font-medium">Your Travel Partner</h1>
        <h3 className="text-xl">Explore Your World with Us</h3>
      </div>

      <button className="bg-white text-cyan-600 border
      border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30
      absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => { e.stopPropagation(); router.push('/restaurants'); }}
      >
        Select Your Restaurant Partner NOW
      </button>
    </div>
  )
}

export default Banner;
