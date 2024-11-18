'use client'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function TopMenuAuthItem() {

  const router = useRouter();

  const { data: session } = useSession()
  const { isDarkMode } = useDarkMode();

  //console.log(session?.user);

  const handleSignOut = () => {
    signOut({
      redirect: false,
    }).then(() => {
      router.push('/');
    }).catch(error => {
      console.error('Error signing out: ', error)
    })
  };

  return (
    session ?
      <div className={`px-[20px] h-[100%] flex justify-center items-center text-sm cursor-pointer 
          ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-black hover:bg-yellow-100'}`}
        onClick={() => { handleSignOut() }} >
        {`Sign-out of ${session?.user?.name}`}
      </div>
      :
      <>
        <Link href={`/login`}>
          <div className={`px-[20px] h-[100%] flex justify-center items-center text-sm cursor-pointer 
            ${isDarkMode ? 'text-gray-200 hover:text-indigo-400 dark:border-indigo-400' : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}>
            Sign In
          </div>
        </Link>
        <Link href={`/register`}>
          <div className={`px-[20px] h-[100%] flex justify-center items-center text-sm cursor-pointer 
            ${isDarkMode ? 'text-gray-200 hover:text-indigo-400 dark:border-indigo-400' : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}>
            Sign Up
          </div>
        </Link>
      </>
    // have no name?????
  );

}
