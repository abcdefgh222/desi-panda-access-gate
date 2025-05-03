
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  position: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  useNativeAd?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className, useNativeAd = false }) => {
  useEffect(() => {
    if (useNativeAd) {
      // Initialize native ad if requested
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl26551926.profitableratecpm.com/49ff6bc5f238399984709ffd72c4f841/invoke.js';
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [useNativeAd]);

  const backgroundColors = {
    left: 'from-purple-400 to-pink-500',
    right: 'from-blue-400 to-indigo-500',
    top: 'from-green-400 to-teal-500',
    bottom: 'from-red-400 to-orange-500',
  };

  if (useNativeAd) {
    return <div id="container-49ff6bc5f238399984709ffd72c4f841" className={className}></div>;
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-2 bg-gradient-to-b',
      backgroundColors[position],
      className
    )}>
      <div className="text-white text-center w-full">
        <p className="font-bold text-sm">ADVERTISEMENT</p>
        {position === 'top' || position === 'bottom' ? (
          <div className="my-2 w-full h-[90px]">
            <div id={`banner-ad-${position}`} className="h-full"></div>
          </div>
        ) : (
          <>
            <div className="my-4 w-full bg-white/20 p-6 rounded flex items-center justify-center">
              <p className="text-sm">Your Ad Here</p>
            </div>
            <div className="my-4 w-full bg-white/20 p-16 rounded flex items-center justify-center">
              <p className="text-sm">Banner Ad</p>
            </div>
            <div className="my-4 w-full bg-white/20 p-12 rounded flex items-center justify-center">
              <p className="text-sm">Sponsored</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdBanner;
