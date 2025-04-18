
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DmcaPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">DMCA & Copyright Policy</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>
            We comply with the Digital Millennium Copyright Act (DMCA). This policy outlines the procedure for reporting 
            copyright infringement and how we handle those reports.
          </p>
          
          <h2>Reporting Copyright Infringement</h2>
          
          <p>
            If you believe any content on our site violates your copyright, please send a written notice to:
          </p>
          
          <p>
            📧 Email: <a href="mailto:dmcadesipanda@gmail.com">dmcadesipanda@gmail.com</a>
          </p>
          
          <p>Your DMCA notice must include the following:</p>
          
          <ol>
            <li>Your full name and contact information (address, telephone number, and email address)</li>
            <li>Identification of the copyrighted work you claim has been infringed</li>
            <li>The exact URL(s) where the allegedly infringing material is located</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
            <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf</li>
            <li>Your electronic or physical signature</li>
          </ol>
          
          <h2>Our Response to DMCA Notices</h2>
          
          <p>Upon receiving a valid DMCA notice, we will:</p>
          
          <ul>
            <li>Remove or disable access to the allegedly infringing content within 48-72 hours</li>
            <li>Take reasonable steps to notify the content provider about the removal</li>
            <li>Provide the content provider with an opportunity to submit a counter-notice</li>
          </ul>
          
          <h2>Counter-Notification Process</h2>
          
          <p>
            If you believe your content was removed due to a mistake or misidentification, you may submit a 
            counter-notification to the email address above. Your counter-notice must include:
          </p>
          
          <ol>
            <li>Your full name and contact information</li>
            <li>Identification of the material that has been removed and its location before removal</li>
            <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
            <li>Your consent to the jurisdiction of the federal court in your area</li>
            <li>Your electronic or physical signature</li>
          </ol>
          
          <p>
            If we receive a valid counter-notice, we will forward it to the original complainant. If the complainant 
            does not notify us of a lawsuit within 14 business days, we may restore the content.
          </p>
          
          <h2>Repeat Infringers</h2>
          
          <p>
            In appropriate circumstances, we will disable or terminate the accounts of users who repeatedly infringe 
            copyrights.
          </p>
          
          <p>Last Updated: April 18, 2025</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DmcaPage;
