import TopMenuItem from '@/components/TopMenuItem';
import Image from 'next/image';
import Link from 'next/link';
//import { getServerSession } from 'next-auth';
//import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const TopMenu = async () => {

  //const session = await getServerSession(authOptions)

  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 w-full z-30 border-t border-b border-gray-300 flex flex-row">
      <Link href={'/'}>
        <Image src={"/img/logo.jpg"} className="h-full w-auto" alt='Logo' width={0} height={0} sizes='100vh' />
      </Link>
      <TopMenuItem title='Restaurant' pageRef='/restaurants' />
      <TopMenuItem title='Reservations' pageRef='/reservations' />

      <div className='flex flex-row absolute right-0 h-full'>
        {/* {
          session ?
            <Link href="/api/auth/signout">
              <div className='flex items-center h-full px-2 text-cyan-600 text-smm'>
                Sign-Out of {session.user?.name}
              </div>
            </Link>
            :
            <Link href="/api/auth/signin">
              <div className='flex items-center h-full px-2 text-cyan-600 text-smm'>
                Sign-In
              </div>
            </Link>
        } */}
      </div>
    </div>
  )
}

export default TopMenu;
