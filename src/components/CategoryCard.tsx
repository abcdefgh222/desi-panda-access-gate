
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, imageUrl, className }) => {
  return (
    <Link to={`/category/${id}`} className={cn("category-card block", className)}>
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '75%' }}>
        <img 
          src={imageUrl || '/placeholder.svg'} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-sm font-medium truncate">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
