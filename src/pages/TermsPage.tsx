
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="prose prose-sm max-w-none">
          <h2>Welcome to Desi Panda</h2>
          
          <p>By accessing this website, you confirm that:</p>
          
          <ul>
            <li>You are 18 years of age or older</li>
            <li>You agree to our Terms of Use, Privacy Policy, and DMCA Policy</li>
            <li>You are entering this site voluntarily, and understand the nature of its content</li>
          </ul>
          
          <p>
            We do not host or upload any pornographic material. All videos/images shown here are either user-submitted or 
            embedded from verified third-party platforms such as Pornhub, XVideos, etc.
          </p>
          
          <p>You must not use this website if:</p>
          
          <ul>
            <li>You are under 18</li>
            <li>It is illegal to view adult content in your country</li>
            <li>You do not accept our terms</li>
          </ul>
          
          <p>Violation of any of these rules may result in access termination.</p>
          
          <h2>Legal Disclaimer</h2>
          
          <p>We do not host adult content on our own servers.</p>
          
          <p>All material is sourced from third-party platforms (e.g., Pornhub, XVideos, RedTube, etc.)</p>
          
          <p>We are not liable for:</p>
          
          <ul>
            <li>Content hosted on third-party sites</li>
            <li>Any mental/emotional effect caused by the content</li>
            <li>Illegal access from restricted regions</li>
          </ul>
          
          <p>It is your own responsibility to ensure that adult content is legal in your region.</p>
          
          <h2>Data Proof & Consent Storage</h2>
          
          <p>To legally protect both users and platform:</p>
          
          <ul>
            <li>We log each user's age confirmation, Firebase user ID, and timestamp into Firestore</li>
            <li>This ensures that the user voluntarily accepted the terms</li>
            <li>We can provide logs if needed for legal verification</li>
          </ul>
          
          <h2>Third-Party Content Disclaimer</h2>
          
          <p>We do not claim ownership over any videos or media linked from external sources.</p>
          
          <p>Example sources include:</p>
          
          <ul>
            <li>https://www.pornhub.com</li>
            <li>https://www.xvideos.com</li>
            <li>https://www.redtube.com</li>
            <li>https://www.qorno.com</li>
            <li>and more...</li>
          </ul>
          
          <p>All copyrights belong to their respective owners. For takedown, contact us.</p>
          
          <p>Last Updated: April 18, 2025</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
