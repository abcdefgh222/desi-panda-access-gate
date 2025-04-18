
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TagsBar from '@/components/TagsBar';
import VideoCard from '@/components/VideoCard';
import { fetchVideos, fetchPremiumVideos, fetchTags } from '@/utils/googleSheets';

const TagPage = () => {
  const { tagId } = useParams<{ tagId: string }>();
  
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });
  
  const { data: regularVideos, isLoading: isLoadingRegular } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const { data: premiumVideos, isLoading: isLoadingPremium } = useQuery({
    queryKey: ['premiumVideos'],
    queryFn: fetchPremiumVideos,
  });

  const isLoading = isLoadingRegular || isLoadingPremium;

  // Find the tag name for display
  const currentTag = tags?.find(tag => tag.tag_id === tagId);
  
  // Filter videos by tag
  const taggedRegularVideos = regularVideos?.filter(video => 
    video.tag?.split(',').map((t: string) => t.trim()).includes(tagId)
  ) || [];
  
  const taggedPremiumVideos = premiumVideos?.filter(video => 
    video.tag?.split(',').map((t: string) => t.trim()).includes(tagId)
  ) || [];
  
  const taggedVideos = [...taggedRegularVideos, ...taggedPremiumVideos];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        <TagsBar />
        
        <h1 className="text-2xl font-bold mt-6 mb-4">
          Tag: {currentTag?.tag_name || tagId}
        </h1>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="video-card animate-pulse">
                <div className="relative w-full bg-gray-200" style={{ paddingBottom: '56.25%' }}></div>
                <div className="p-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : taggedVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {taggedVideos.map((video) => {
              // Check if this is a premium video by seeing if it's from the premium videos array
              const isPremium = premiumVideos?.some(pv => pv.id === video.id) || false;
              
              return (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  imageUrl={video.image_url}
                  duration={video.duration}
                  isPremium={isPremium}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">No videos found for this tag</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TagPage;
