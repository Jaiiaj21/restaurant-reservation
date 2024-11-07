import Image from "next/image";

export default function Logo({ imgSrc }: { imgSrc: string }) {
  return (
    <div className="mt-[40px]">
      <Image src={imgSrc} width={160} height={80} alt="logo" />
    </div>
  );
}
