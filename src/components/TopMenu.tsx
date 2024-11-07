'use client'
import TopMenuAuthItem from '@/components/authentication/TopMenuAuthItem';
import TopMenuItem from '@/components/TopMenuItem';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import { getServerSession } from 'next-auth';
//import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const TopMenu = () => {
  const pathname = usePathname();
  const hideTopMenu = pathname === "/login" || pathname === "/register";

  //const session = await getServerSession(authOptions)
  if (hideTopMenu) return null

  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 w-full z-30 border-t border-b border-gray-300 flex flex-row">
      <Link href={'/'}>
        <Image src={"/img/logo.jpg"} className="h-full w-auto" alt='Logo' width={0} height={0} sizes='100vh' />
      </Link>
      <TopMenuItem title='Restaurant' pageRef='/restaurants' />
      <TopMenuItem title='Reservations' pageRef='/reservations' />

      <div className='flex flex-row absolute right-0 h-full w-auto'>
        <TopMenuAuthItem />
      </div>
    </div>
  )
}

export default TopMenu;
