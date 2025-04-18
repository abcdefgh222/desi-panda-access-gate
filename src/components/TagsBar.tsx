
import React from 'react';
import { Link } from 'react-router-dom';

const tags = [
  { id: 'tag1', name: 'tag' },
  { id: 'tag2', name: 'tags' },
  { id: 'tag3', name: 'tag' },
  { id: 'tag4', name: 'tags' },
  { id: 'tag5', name: 'tag' },
];

const TagsBar: React.FC = () => {
  return (
    <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar">
      {tags.map((tag) => (
        <Link 
          key={tag.id}
          to={`/tag/${tag.id}`}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagsBar;
