
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TagsBar from '@/components/TagsBar';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { fetchCategories } from '@/utils/googleSheets';
import AdBanner from '@/components/AdBanner';

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  
  // Check if user has already verified age
  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    setShowAgeVerification(!isVerified);
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
          )}
        </main>
        
        {/* Right Ad Banner */}
        <AdBanner position="right" className="hidden lg:block w-[160px] sticky top-20 h-screen" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
