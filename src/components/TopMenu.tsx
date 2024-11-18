'use client';
import TopMenuAuthItem from '@/components/authentication/TopMenuAuthItem';
import TopMenuItem from '@/components/TopMenuItem';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopMenu = () => {
  const pathname = usePathname();
  const hideTopMenu = pathname === "/login" || pathname === "/register";

  if (hideTopMenu) return null;

  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 w-full z-30 border-t border-b border-gray-300 flex items-center px-4">
      <Link href={'/'} className="flex items-center h-full">
        <Image 
          src="/img/logo.jpg"
          alt="Logo"
          width={40}  // Set logo dimensions for consistency
          height={40}
          className="object-contain"
        />
      </Link>
      <nav className="flex flex-row items-center space-x-4 ml-4">
        <TopMenuItem title="Restaurant" pageRef="/restaurants" />
        <TopMenuItem title="Reservations" pageRef="/reservations" />
      </nav>
      <div className="ml-auto flex items-center">
        <TopMenuAuthItem />
      </div>
    </div>
  );
};

export default TopMenu;
