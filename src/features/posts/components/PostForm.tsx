import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { postSchema, PostFormValues } from '../schemas/postSchema';

interface PostFormProps {
  onSubmit: (values: PostFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const handleFormSubmit = async (data: PostFormValues) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-bold text-gray-700 mb-4">Nueva Actividad</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Título"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Ej: Entrenamiento de pierna"
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm"
          placeholder="¿Qué hiciste hoy?"
          {...register('content')}
        />
        {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Publicar
        </Button>
      </form>
    </Card>
  );
};
