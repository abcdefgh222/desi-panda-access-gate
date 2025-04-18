
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const StatementPage = () => {
  const { statementType } = useParams<{ statementType: string }>();

  const renderContent = () => {
    switch (statementType) {
      case '2257':
        return (
          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-4">18 U.S.C. 2257 Compliance Statement</h1>
            <p className="mb-4">
              In compliance with the Federal Labeling and Record-Keeping Law (also known as 18 U.S.C. 2257), all models, actors, 
              actresses or other persons that appear in any visual portrayal of actual sexually explicit conduct appearing or 
              otherwise contained in this website were over the age of eighteen (18) years at the time of the creation of such depictions.
            </p>
            <p className="mb-4">
              The content shown on this website is either user-submitted by individuals who are responsible for compliance with 
              the 2257 rules, or embedded from third-party websites that are also legally responsible for record keeping.
            </p>
            <p className="mb-4">
              We do not produce, host, or control any of the content and are not the primary producer of any such material.
            </p>
            <p className="mb-4">
              For any record-keeping request or legal concern, please contact us at: 📧 your-legal@email.com
            </p>
          </div>
        );
      case 'faq':
        return (
          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
            
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
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default StatementPage;
