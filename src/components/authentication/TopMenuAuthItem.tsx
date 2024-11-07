'use client'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TopMenuAuthItem() {

  const router = useRouter();

  const { data: session } = useSession()

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
      <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center text-sm text-black cursor-pointer"
        onClick={() => { handleSignOut() }} >
        {`Sign-out of ${session?.user?.name}`}
      </div>
      :
      <>
        <Link href={`/login`}>
          <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center text-sm text-black cursor-pointer ">
            Sign In
          </div>
        </Link>
        <Link href={`/register`}>
          <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center text-sm text-black cursor-pointer" >
            Sign Up
          </div>
        </Link>
      </>
    // have no name?????
  );

}
