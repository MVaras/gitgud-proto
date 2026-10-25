import { supabase } from '../../lib/supabase';
import { Post } from '../../types';
import { PostFormValues } from '../schemas/postSchema';

export const postService = {
  async getPosts(): Promise<Post[]> {
    // Using a join or count can be done via RPC, but for the prototype 
    // we'll fetch posts and we'll assume the count is handled or added via a view/RPC later.
    // For now, we fetch posts.
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        likes_count:post_likes(count)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Transform the Supabase response to flatten likes_count
    return data.map((p: any) => ({
      ...p,
      likes_count: p.likes_count?.[0]?.count || 0
    })) as Post[];
  },

  async createPost(values: PostFormValues, userId: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .insert([{ ...values, user_id: userId }]);
    if (error) throw error;
  },

  async deletePost(postId: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
    if (error) throw error;
  },

  async toggleLike(postId: string, userId: string): Promise<void> {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('id', existingLike.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, user_id: userId }]);
      if (error) throw error;
    }
  }
};
