
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  position: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  useNativeAd?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className, useNativeAd = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (useNativeAd && containerRef.current) {
      // Delay ad loading to improve initial page loading time
      const timer = setTimeout(() => {
        // Initialize native ad if requested
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl26551926.profitableratecpm.com/49ff6bc5f238399984709ffd72c4f841/invoke.js';
        
        // Clear any existing content before appending
        if (containerRef.current) {
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
          
          containerRef.current.appendChild(script);
        }
      }, 1000); // Delay ad loading by 1 second

      return () => {
        clearTimeout(timer);
        if (containerRef.current) {
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
        }
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
    return <div id="container-49ff6bc5f238399984709ffd72c4f841" ref={containerRef} className={className}></div>;
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-2 bg-gradient-to-b',
      backgroundColors[position],
      className
    )}>
      <div className="text-white text-center w-full">
        <p className="font-bold text-sm">ADVERTISEMENT</p>
        <div className="py-2 text-center uppercase font-bold">Your Ad Here</div>
        {position === 'top' || position === 'bottom' ? (
          <div className="my-2 w-full h-[90px] bg-white/20 flex items-center justify-center">
            <p className="text-sm">Banner Ad</p>
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
