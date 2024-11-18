import InteractiveCard from '@/components/InteractiveCard';
import { useDarkMode } from '@/contexts/DarkModeContext';
import Image from 'next/image';


const ProductCard = ({ name, imgSrc, onCompare }: { name: string, imgSrc: string, onCompare?: (name: string) => void }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <InteractiveCard>
      <div className="w-full h-[75%] relative rounded-t-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill
          className="object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className={`w-full h-[25%] p-3 rounded-b-lg shadow-md 
         ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <p className={`text-lg font-semibold 
          ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{name}</p>
      </div>
      {
        onCompare ? (
          <button
            className="block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-3 py-1 text-white shadow-sm transition-colors"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onCompare(name); }}
          >
            Compare
          </button>
        ) : null
      }
    </InteractiveCard>
  );
};

export default ProductCard;
