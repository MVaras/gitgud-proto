import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressionService } from '../services/progressionService';
import { AchievementFormValues } from '../schemas/achievementSchema';
import { toast } from 'react-hot-toast';

export function useProgression(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ['achievements', userId],
    queryFn: () => progressionService.getAchievements(userId!),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: (values: AchievementFormValues) => progressionService.addAchievement(values, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements', userId] });
      toast.success('¡Logro registrado!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => progressionService.deleteAchievement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements', userId] });
      toast.success('Logro eliminado');
    },
  });

  return {
    achievements,
    isLoading,
    addAchievement: addMutation.mutateAsync,
    deleteAchievement: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
