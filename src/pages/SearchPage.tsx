
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { fetchVideos, fetchPremiumVideos } from '@/utils/googleSheets';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  const { data: regularVideos, isLoading: isLoadingRegular } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const { data: premiumVideos, isLoading: isLoadingPremium } = useQuery({
    queryKey: ['premiumVideos'],
    queryFn: fetchPremiumVideos,
  });

  useEffect(() => {
    if (!query || (!regularVideos && !premiumVideos)) return;

    const searchTerm = query.toLowerCase();
    
    // Search in regular videos
    const regularResults = regularVideos?.filter((video: any) => 
      video.title?.toLowerCase().includes(searchTerm) || 
      video.description?.toLowerCase().includes(searchTerm) ||
      video.tag?.toLowerCase().includes(searchTerm)
    ) || [];
    
    // Search in premium videos
    const premiumResults = premiumVideos?.filter((video: any) => 
      video.title?.toLowerCase().includes(searchTerm) || 
      video.description?.toLowerCase().includes(searchTerm) ||
      video.tag?.toLowerCase().includes(searchTerm)
    ) || [];
    
    setResults([...regularResults, ...premiumResults]);
  }, [query, regularVideos, premiumVideos]);

  const isLoading = isLoadingRegular || isLoadingPremium;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        <h1 className="text-2xl font-bold mt-2 mb-4">
          Search Results: {query}
        </h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-lg">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                imageUrl={video.image_url}
                duration={video.duration}
                isPremium={!!video.Premium_sub_id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">No results found for "{query}"</p>
            <p className="mt-2 text-gray-500">Try different keywords or check your spelling</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
