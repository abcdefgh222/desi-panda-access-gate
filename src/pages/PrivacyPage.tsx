
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>Effective Date: April 18, 2025</p>
          
          <p>At Desi Panda, we respect your privacy.</p>
          
          <h2>Information We Collect</h2>
          
          <ul>
            <li>We do not collect personal data like name, address, or financial information</li>
            <li>We may collect technical data like browser, device info, or IP address to improve user experience</li>
            <li>If you log in via Google (Firebase), we store your user ID and age confirmation status in a secure database</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          
          <h2>Data Sharing</h2>
          
          <p>We will never sell, trade, or misuse your data.</p>
          
          <p>We may share your information in the following situations:</p>
          
          <ul>
            <li>With service providers to monitor and analyze the use of our service</li>
            <li>For business transfers (e.g., if we merge with or are acquired by another company)</li>
            <li>With law enforcement agencies if required by law</li>
          </ul>
          
          <h2>Your Rights</h2>
          
          <p>You can request deletion of your data at any time by contacting us.</p>
          
          <p>If you have any questions or concerns about our Privacy Policy, please contact us.</p>
          
          <h2>Cookies Policy</h2>
          
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain 
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
            if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
          
          <p>Your use of this site confirms that you accept this policy.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
