
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  className?: string;
  isPremium?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  id, 
  title, 
  imageUrl, 
  duration, 
  className,
  isPremium = false 
}) => {
  return (
    <Link to={`/video/${id}`} className={cn("category-card block", className)}>
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <img 
          src={imageUrl || '/placeholder.svg'} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        {isPremium && (
          <div className="absolute top-2 left-2 bg-adult-red text-white text-xs px-2 py-1 rounded">
            PREMIUM
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-sm font-medium truncate">{title}</h3>
      </div>
    </Link>
  );
};

export default VideoCard;
