
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { fetchPremiumVideosBySubcategory } from '@/utils/googleSheets';

const PremiumSubcategoryPage = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  
  const { data: videos, isLoading } = useQuery({
    queryKey: ['premiumVideos', subcategoryId],
    queryFn: () => fetchPremiumVideosBySubcategory(subcategoryId || ''),
    enabled: !!subcategoryId,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Premium: {subcategoryId}</h1>
        
        {isLoading ? (
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
                isPremium={true}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumSubcategoryPage;
