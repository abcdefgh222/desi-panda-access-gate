
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TagsBar from '@/components/TagsBar';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { fetchCategories } from '@/utils/googleSheets';
import AdBanner from '@/components/AdBanner';

// Banner Ad Component - Modified to prevent redirects
const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Delay ad loading to improve page loading time
    const timer = setTimeout(() => {
      // Clear any existing content
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        
        // Create banner ad script
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.innerHTML = `
          atOptions = {
            'key' : '85638e75aff36f37df207e7b74261175',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        containerRef.current.appendChild(script1);

        // Create banner ad invoke script with async to prevent blocking
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.async = true;
        script2.src = '//www.highperformanceformat.com/85638e75aff36f37df207e7b74261175/invoke.js';
        containerRef.current.appendChild(script2);
      }
    }, 1500); // Delay ad loading by 1.5 seconds

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        // Clean up scripts when component unmounts
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[90px] flex justify-center my-4"></div>;
};

// Native Ad Component - Modified to prevent redirects
const NativeAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Delay ad loading to improve page loading time
    const timer = setTimeout(() => {
      if (containerRef.current) {
        // Create container div for the ad
        const container = document.createElement('div');
        container.id = 'container-49ff6bc5f238399984709ffd72c4f841';
        
        // Clear existing content
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        
        containerRef.current.appendChild(container);
        
        // Create native ad script with async to prevent blocking
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl26551926.profitableratecpm.com/49ff6bc5f238399984709ffd72c4f841/invoke.js';
        containerRef.current.appendChild(script);
      }
    }, 2000); // Delay ad loading by 2 seconds

    return () => {
      clearTimeout(timer);
      // Clean up script when component unmounts
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="my-4 w-full"></div>;
};

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  
  // Check if user has already verified age
  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    setShowAgeVerification(!isVerified);

    // Remove popunder ad script - this is likely causing the redirects
    // We won't add the popunder script at all
  }, []);
  
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleAgeVerified = () => {
    setShowAgeVerification(false);
  };

  if (showAgeVerification) {
    return <AgeVerificationModal onVerified={handleAgeVerified} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-grow w-full">
        {/* Left Ad Banner */}
        <AdBanner position="left" className="hidden lg:block w-[160px] sticky top-20 h-screen" />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
          {/* Top Banner Ad */}
          <BannerAd />
          
          <TagsBar />
          
          <h1 className="text-2xl font-bold mt-6 mb-4">Categories</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="category-card animate-pulse">
                  <div className="relative w-full bg-gray-200" style={{ paddingBottom: '75%' }}></div>
                  <div className="p-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error loading categories. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories?.map((category) => (
                  <CategoryCard
                    key={category.Category_id}
                    id={category.Category_id}
                    title={category.Category}
                    imageUrl={category.Poster_url}
                  />
                ))}
              </div>
              
              {/* Native Ad in the middle of content */}
              <NativeAd />
            </>
          )}
          
          {/* Bottom Banner Ad */}
          <BannerAd />
        </main>
        
        {/* Right Ad Banner */}
        <AdBanner position="right" className="hidden lg:block w-[160px] sticky top-20 h-screen" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
