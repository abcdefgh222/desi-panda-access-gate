
import React from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  position: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className }) => {
  const backgroundColors = {
    left: 'from-purple-400 to-pink-500',
    right: 'from-blue-400 to-indigo-500',
    top: 'from-green-400 to-teal-500',
    bottom: 'from-red-400 to-orange-500',
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-2 bg-gradient-to-b',
      backgroundColors[position],
      className
    )}>
      <div className="text-white text-center">
        <p className="font-bold text-sm">ADVERTISEMENT</p>
        <div className="my-4 w-full bg-white/20 p-6 rounded flex items-center justify-center">
          <p className="text-sm">Your Ad Here</p>
        </div>
        <div className="my-4 w-full bg-white/20 p-16 rounded flex items-center justify-center">
          <p className="text-sm">Banner Ad</p>
        </div>
        <div className="my-4 w-full bg-white/20 p-12 rounded flex items-center justify-center">
          <p className="text-sm">Sponsored</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
