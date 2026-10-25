import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { Post } from '../../types';
import { PostFormValues } from '../schemas/postSchema';

export function usePosts() {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });

  const createMutation = useMutation({
    mutationFn: ({ values, userId }: { values: PostFormValues; userId: string }) => 
      postService.createPost(values, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => postService.deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  const likeMutation = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => 
      postService.toggleLike(postId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  return {
    posts,
    isLoading,
    isError,
    error,
    createPost: createMutation.mutateAsync,
    deletePost: deleteMutation.mutateAsync,
    toggleLike: likeMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isLiking: likeMutation.isPending,
  };
}
