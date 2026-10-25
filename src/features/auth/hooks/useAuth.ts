import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { LoginFormValues, SignUpFormValues } from '../schemas/authSchema';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: () => authService.getSession(),
    staleTime: Infinity, // Session is handled by Supabase's own persistence/listener
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => authService.login(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (values: SignUpFormValues) => authService.signUp(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    },
  });

  return {
    session,
    isSessionLoading,
    login: loginMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    errors: {
      login: loginMutation.error as Error | null,
      signUp: signUpMutation.error as Error | null,
      logout: logoutMutation.error as Error | null,
    }
  };
}
