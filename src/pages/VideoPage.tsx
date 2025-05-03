import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchVideos, fetchPremiumVideos } from '@/utils/googleSheets';
import { Download } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

// Add this component to inject ad scripts 
const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
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

    // Create banner ad invoke script
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = '//www.highperformanceformat.com/85638e75aff36f37df207e7b74261175/invoke.js';
    containerRef.current.appendChild(script2);

    return () => {
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

// Add this component for native ads
const NativeAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create container div for the ad
    const container = document.createElement('div');
    container.id = 'container-49ff6bc5f238399984709ffd72c4f841';
    
    // Create native ad script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26551926.profitableratecpm.com/49ff6bc5f238399984709ffd72c4f841/invoke.js';
    
    // Clear existing content and append new elements
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(script);
    containerRef.current.appendChild(container);

    return () => {
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

const VideoPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Add popunder script on page load
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl26551942.profitableratecpm.com/fa/31/9d/fa319dd102342bb47bed8085a19ad54c.js';
    document.body.appendChild(script);

    return () => {
      if (script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const { data: regularVideos, isError: isRegularError } = useQuery({
    queryKey: ['allVideos'],
    queryFn: fetchVideos,
    retry: 3,
    meta: {
      onError: (err: Error) => {
        console.log('Error fetching regular videos', err);
      }
    }
  });
  
  const { data: premiumVideos, isError: isPremiumError } = useQuery({
    queryKey: ['allPremiumVideos'],
    queryFn: fetchPremiumVideos,
    retry: 3,
    meta: {
      onError: (err: Error) => {
        console.log('Error fetching premium videos', err);
      }
    }
  });
  
  useEffect(() => {
    if (isRegularError && isPremiumError) {
      setError('Unable to fetch videos. Please try again later.');
      return;
    }

    if (regularVideos && premiumVideos && videoId) {
      // First check regular videos
      const foundRegular = regularVideos.find(v => v.id === videoId);
      if (foundRegular) {
        setVideo(foundRegular);
        return;
      }
      
      // Then check premium videos
      const foundPremium = premiumVideos.find(v => v.id === videoId);
      if (foundPremium) {
        setVideo(foundPremium);
        return;
      }
      
      setError(`Video not found: ${videoId}`);
    }
  }, [videoId, regularVideos, premiumVideos, isRegularError, isPremiumError]);

  // Function to safely extract YouTube video ID from various formats
  const getYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    // Handle iframe embed codes
    const iframeSrcMatch = url.match(/src=["'](.*?)["']/);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      url = iframeSrcMatch[1];
    }
    
    // Match YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return match[2];
    }
    
    return null;
  };

  // Function to safely create embed URL
  const getSafeEmbedUrl = (url: string) => {
    try {
      if (!url) return "";
      
      // Handle YouTube videos
      const youtubeId = getYoutubeVideoId(url);
      if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}`;
      }
      
      // Handle direct iframe src URLs
      if (url.includes('src=')) {
        const srcMatch = url.match(/src=["'](.*?)["']/);
        if (srcMatch && srcMatch[1]) {
          return srcMatch[1];
        }
      }
      
      // Return original URL if no patterns match and it's a valid URL
      if (url.startsWith('http')) {
        return url;
      }
      
      return "";
    } catch (error) {
      console.error("Error processing embed URL:", error);
      return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        {/* Add banner ad at the top */}
        <BannerAd />
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : !video ? (
              <div className="video-container animate-pulse bg-gray-200" style={{ paddingBottom: '56.25%', position: 'relative' }}></div>
            ) : (
              <>
                <div className="video-container relative" style={{ paddingBottom: '56.25%' }}>
                  {video.embed_code ? (
                    <iframe
                      src={getSafeEmbedUrl(video.embed_code)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute w-full h-full"
                      title={video.title}
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-black absolute w-full">
                      <p className="text-white">Video not available</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <h1 className="text-xl font-bold">{video.title}</h1>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">Added: {video.added_date}</span>
                    <span className="text-sm text-gray-500">Duration: {video.duration}</span>
                  </div>
                  
                  {video.download && (
                    <a
                      href={video.download}
                      className="inline-flex items-center mt-4 bg-adult-button text-white px-4 py-2 rounded-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={18} className="mr-2" />
                      Download
                    </a>
                  )}
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">Description:</h3>
                    <p className="text-gray-700 mt-1">{video.description || "No description available."}</p>
                  </div>
                  
                  {/* Add native ad after video description */}
                  <NativeAd />
                  
                  {video.tag && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {video.tag.split(',').map((tag: string, index: number) => (
                        <span
                          key={`tag-${index}`}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="lg:w-1/4">
            <AdBanner position="right" className="sticky top-20 h-screen" />
          </div>
        </div>
        
        {/* Add another banner ad at the bottom */}
        <BannerAd />
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoPage;
