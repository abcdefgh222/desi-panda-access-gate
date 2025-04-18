
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
          
          {/* Compliance Statement */}
          <div className="mt-12 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">18 U.S.C. 2257 Compliance Statement</h2>
            <p className="text-sm text-gray-700">
              In compliance with the Federal Labeling and Record-Keeping Law (also known as 18 U.S.C. 2257), all models, actors, 
              actresses or other persons that appear in any visual portrayal of actual sexually explicit conduct appearing or 
              otherwise contained in this website were over the age of eighteen (18) years at the time of the creation of such depictions.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              The content shown on this website is either user-submitted by individuals who are responsible for compliance with 
              the 2257 rules, or embedded from third-party websites that are also legally responsible for record keeping.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              We do not produce, host, or control any of the content and are not the primary producer of any such material.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              For any record-keeping request or legal concern, please contact us at: 📧 your-legal@email.com
            </p>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">Q1. Who can access this website?</h3>
                <p className="text-gray-700 mt-1">Only users aged 18+ are allowed to enter. Age verification is mandatory.</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">Q2. Do you store any personal information?</h3>
                <p className="text-gray-700 mt-1">No personal details like your name or address are collected. Only basic usage data (e.g., Firebase ID, age consent) may be stored securely.</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">Q3. Are the videos/images hosted on this website?</h3>
                <p className="text-gray-700 mt-1">No. All content is either user-submitted or embedded from third-party platforms like Pornhub, XVideos, etc.</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">Q4. What happens if I see my copyrighted content here?</h3>
                <p className="text-gray-700 mt-1">Send us a DMCA takedown request, and we will remove the content within 48–72 hours.</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">Q5. How do you ensure legal protection for the site owner?</h3>
                <p className="text-gray-700 mt-1">We log proof of user's age confirmation, timestamp, and Firebase ID in Firestore Database to protect the website from false legal claims.</p>
              </div>
            </div>
          </div>
        </main>
        
        {/* Right Ad Banner */}
        <AdBanner position="right" className="hidden lg:block w-[160px] sticky top-20 h-screen" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
