
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { recordAgeVerification } from '@/utils/firebase';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

interface AgeVerificationModalProps {
  onVerified: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onVerified }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleAccept = async () => {
    setIsLoading(true);
    
    try {
      if (user) {
        // Record verification for logged in user
        await recordAgeVerification(user);
        toast({
          title: "Verification Completed",
          description: "Your age verification has been recorded.",
        });
      } else {
        // Just allow access without recording for non-logged in users
        toast({
          title: "Access Granted",
          description: "Please consider logging in for a better experience.",
        });
      }
      
      // Save in local storage to prevent showing again
      localStorage.setItem('ageVerified', 'true');
      
      // Allow access
      onVerified();
    } catch (error) {
      console.error("Error during age verification:", error);
      toast({
        title: "Verification Error",
        description: "There was an error verifying your age. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-black text-white rounded-lg p-4 sm:p-6 max-w-2xl w-full border border-gray-700 my-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-adult-red rounded-full p-3 sm:p-4 w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl font-bold">18+</span>
          </div>
        </div>
        
        <h1 className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Desi Panda is an ADULTS ONLY website!
        </h1>
        
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base">
          <p>
            You are about to enter a website that contains explicit material (pornography). This website should only be 
            accessed if you are at least 18 years of age, or at least the age to view such material in your local jurisdiction, 
            whichever is greater.
          </p>
          
          <p>
            By entering, you acknowledge and warrant that you will not allow any minor to access this site or services. 
            <span className="font-bold"> PARENTS, PLEASE BE ADVISED!</span>
          </p>
          
          <p>
            If you are concerned about your children viewing any age-restricted content from being displayed on your children 
            or wards device, we recommend to install parental controls or content filters, access this site by using parental 
            controls. Parental tools that are free on the RTA label will better enable parental filtering. Parental tools that are 
            compliant with the RTA label will block access to this site.
          </p>
          
          <p>
            You can find more information about the RTA label and compatible services here.
          </p>
          
          <p className="font-semibold">
            Other steps you can take to protect your children are:
          </p>
          
          <ul className="list-disc pl-6">
            <li>Use family filters at your operating systems and/or browsers</li>
            <li>Enable SafeSearch on search engines like Google, Bing, or DuckDuckGo</li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-6 pb-2">
          <button 
            onClick={handleAccept} 
            disabled={isLoading}
            className="entry-button w-full sm:w-auto bg-adult-button text-white px-4 sm:px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors text-base sm:text-lg"
          >
            {isLoading ? "Processing..." : "I AM 18+ ENTER"}
          </button>
          
          <button 
            onClick={handleReject}
            className="text-gray-400 hover:text-white transition-colors mt-1 sm:mt-2"
          >
            No, I am under 18
          </button>
          
          <p className="text-xs sm:text-sm text-center text-gray-400 mt-1 sm:mt-2">
            When accessing this site you are agree to our{" "}
            <Link to="/terms" className="text-adult-button hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-adult-button hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
