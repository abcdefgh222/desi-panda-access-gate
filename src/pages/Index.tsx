
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TagsBar from '@/components/TagsBar';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { fetchCategories } from '@/utils/googleSheets';
import AdBanner from '@/components/AdBanner';

// Banner Ad Component
const BannerAd: React.FC = () => {
  useEffect(() => {
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
    document.body.appendChild(script1);

    // Create banner ad invoke script
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = '//www.highperformanceformat.com/85638e75aff36f37df207e7b74261175/invoke.js';
    document.body.appendChild(script2);

    return () => {
      // Clean up scripts when component unmounts
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return <div className="w-full h-[90px] flex justify-center my-4"></div>;
};

// Native Ad Component
const NativeAd: React.FC = () => {
  useEffect(() => {
    // Create native ad script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26551926.profitableratecpm.com/49ff6bc5f238399984709ffd72c4f841/invoke.js';
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-49ff6bc5f238399984709ffd72c4f841" className="my-4 w-full"></div>;
};

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  
  // Check if user has already verified age
  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    setShowAgeVerification(!isVerified);

    // Add popunder script on page load
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl26551942.profitableratecpm.com/fa/31/9d/fa319dd102342bb47bed8085a19ad54c.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
