import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, signUpSchema, LoginFormValues, SignUpFormValues } from '../schemas/authSchema';

type Mode = 'login' | 'signup';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const { login, signUp, isLoggingIn, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues | SignUpFormValues>({
    resolver: mode === 'login' ? zodResolver(loginSchema) : zodResolver(signUpSchema),
  });

  const onSubmit = async (data: LoginFormValues | SignUpFormValues) => {
    try {
      if (mode === 'login') {
        await login(data as LoginFormValues);
        toast.success('¡Bienvenido de nuevo!');
      } else {
        await signUp(data as SignUpFormValues);
        toast.success('Registro exitoso. Revisa tu email.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mode === 'login' ? 'Gitgud Login' : 'Crear Cuenta'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="tu@email.com"
          />
          <Input
            label="Contraseña"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="••••••••"
          />
          
          <Button 
            type="submit" 
            className="w-full mt-4" 
            isLoading={isLoggingIn || isSigningUp}
          >
            {mode === 'login' ? 'Entrar' : 'Registrarse'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button onClick={toggleMode} className="text-blue-600 font-medium hover:underline">
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button onClick={toggleMode} className="text-blue-600 font-medium hover:underline">
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
