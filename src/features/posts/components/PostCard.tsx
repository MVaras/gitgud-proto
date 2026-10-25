import React from 'react';
import { Post } from '../../types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Heart } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onLike: (postId: string) => void;
  isDeleting: boolean;
  isLiking: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onLike, isDeleting, isLiking }) => {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-bold text-lg text-gray-800 leading-tight">{post.title}</h4>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">{post.content}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart 
                size={18} 
                className={post.likes_count && post.likes_count > 0 ? 'fill-red-500 text-red-500' : ''} 
              />
              <span>{post.likes_count || 0}</span>
            </button>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              User: {post.user_id.slice(0, 8)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            className="text-red-500 hover:bg-red-50 p-1 h-8 w-8 min-w-0"
            onClick={() => onDelete(post.id)}
            isLoading={isDeleting}
          >
            ✕
          </Button>
        </div>
      </div>
    </Card>
  );
};
