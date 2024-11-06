import InteractiveCard from '@/components/InteractiveCard';
import Image from 'next/image';

const ProductCard = ({ name, imgSrc, onCompare }: { name: string, imgSrc: string, onCompare?: (name: string) => void }) => {

  return (
    <InteractiveCard contentName={name}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px]">{name}</div>
      {
        onCompare ?
          <button
            className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onCompare(name); }}
          >
            Compare
          </button>
          : null
      }
    </InteractiveCard>
  );
}

export default ProductCard;
