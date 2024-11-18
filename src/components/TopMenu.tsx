'use client';
import TopMenuAuthItem from '@/components/authentication/TopMenuAuthItem';
import TopMenuItem from '@/components/TopMenuItem';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const TopMenu = () => {
  const pathname = usePathname();
  const hideTopMenu = pathname === "/login" || pathname === "/register";

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  if (hideTopMenu) return null;

  return (
    <div className="h-[50px] fixed top-0 left-0 right-0 w-full z-30 border-b flex items-center bg-white border-gray-300
      dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300 ease-in-out">
      <Link href={'/'} className="flex items-center h-full">
        <Image 
          src="/img/logo.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>
      <nav className="flex flex-row items-center space-x-4 ml-4">
        <TopMenuItem title="Restaurant" pageRef="/restaurants"/>
        <TopMenuItem title="Reservations" pageRef="/reservations"/>
      </nav>
      <div className="ml-auto flex items-center">
        <TopMenuAuthItem />
        <button 
          onClick={toggleDarkMode} 
          className="ml-4 mr-2 p-2 rounded-full transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300
            dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <MoonIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <SunIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopMenu;
