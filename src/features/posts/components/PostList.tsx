import React from 'react';
import { PostCard } from './PostCard';
import { PostForm } from './PostForm';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Skeleton } from '../../../components/ui/Skeleton';
import { MessageSquareOff } from 'lucide-react';

export const PostList: React.FC = () => {
  const { session } = useAuth();
  const { posts, isLoading, createPost, deletePost, toggleLike, isCreating, isDeleting, isLiking } = usePosts();

  if (!session) return null;

  const handleCreate = async (values: any) => {
    try {
      await createPost({ values, userId: session.user.id });
      toast.success('¡Publicado!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este post?')) return;
    try {
      await deletePost(id);
      toast.success('Eliminado');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await toggleLike({ postId, userId: session.user.id });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <PostForm onSubmit={handleCreate} isSubmitting={isCreating} />
      </div>
      
      <div className="md:col-span-2 space-y-4">
        <h3 className="font-bold text-gray-700 text-xl px-1">Feed de Actividades</h3>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 px-6">
            <div className="flex justify-center mb-4">
              <MessageSquareOff size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Sin actividad aún</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Sé el primero en compartir tu progreso con la comunidad.
            </p>
            <div className="mt-6">
               {/* Button is already in PostForm, but we could add a shortcut here */}
            </div>
          </div>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDelete} 
              onLike={handleLike}
              isDeleting={isDeleting} 
              isLiking={isLiking}
            />
          ))
        )}
      </div>
    </div>
  );
};
