import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TopMenuItemProps {
  title: string;
  pageRef: string;
}

const TopMenuItem: React.FC<TopMenuItemProps> = ({ title, pageRef }) => {
  const pathname = usePathname();
  const isActive = pathname === pageRef;

  return (
    <Link 
      href={pageRef}
      className={`px-4 py-2 font-sans text-sm text-gray-600 hover:text-indigo-600 transition-colors ${
        isActive ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
      }`}
    >
      {title}
    </Link>
  );
};

export default TopMenuItem;
