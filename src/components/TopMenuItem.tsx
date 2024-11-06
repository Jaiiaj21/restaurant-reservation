import Link from 'next/link';

const TopMenuItem = ({ title, pageRef }: { title: string, pageRef: string }) => {
  return (
    <Link href={pageRef} className="w-[120px] text-center my-auto font-sans text-[10pt] text-gray-500">
      {title}
    </Link>
  )
}

export default TopMenuItem;
