
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { fetchVideosByCategory, fetchPremiumVideosBySubcategory, fetchPremiumSubcategories } from '@/utils/googleSheets';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    // Check if this is a premium category
    setIsPremium(categoryId === 'premium');
  }, [categoryId]);
  
  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ['videos', categoryId],
    queryFn: () => fetchVideosByCategory(categoryId || ''),
    enabled: !isPremium && !!categoryId,
  });
  
  const { data: premiumSubcategories, isLoading: isSubcategoriesLoading } = useQuery({
    queryKey: ['premiumSubcategories'],
    queryFn: fetchPremiumSubcategories,
    enabled: isPremium,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        <h1 className="text-2xl font-bold mb-6">
          {isPremium ? 'Premium Content' : `Category: ${categoryId}`}
        </h1>
        
        {isPremium ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Premium Subcategories</h2>
            {isSubcategoriesLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="category-card animate-pulse">
                    <div className="relative w-full bg-gray-200" style={{ paddingBottom: '75%' }}></div>
                    <div className="p-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {premiumSubcategories?.map((subcategory) => (
                  <VideoCard
                    key={subcategory.Premium_sub_id}
                    id={`premium/${subcategory.Premium_sub_id}`}
                    title={subcategory.title}
                    imageUrl={subcategory.image_url}
                    duration=""
                    isPremium={true}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {isVideosLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="category-card animate-pulse">
                    <div className="relative w-full bg-gray-200" style={{ paddingBottom: '56.25%' }}></div>
                    <div className="p-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {videos?.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    imageUrl={video.image_url}
                    duration={video.duration}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
