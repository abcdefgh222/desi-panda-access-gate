
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '@/utils/googleSheets';

const TagsBar: React.FC = () => {
  const { data: tags, isLoading, error } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-8 w-20 rounded-full"></div>
        ))}
      </div>
    );
  }

  if (error || !tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar">
      {tags.map((tag) => (
        <Link 
          key={tag.tag_id}
          to={`/tag/${tag.tag_id}`}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
        >
          {tag.tag_name}
        </Link>
      ))}
    </div>
  );
};

export default TagsBar;
