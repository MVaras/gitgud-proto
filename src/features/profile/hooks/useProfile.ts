import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { ProfileFormValues } from '../schemas/profileSchema';
import { toast } from 'react-hot-toast';

export function useProfile(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.getProfile(userId!),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: (values: ProfileFormValues) => profileService.updateProfile(userId!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast.success('Perfil actualizado');
    },
  });

  return {
    profile,
    isLoading,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
