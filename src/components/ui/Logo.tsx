'use client';
import { ASSETS } from '@/constants';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="w-8">
      <Image
        src={ASSETS.IMAGES.LOGO}
        alt="Logo"
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
