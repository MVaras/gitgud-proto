import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { profileSchema, ProfileFormValues } from '../schemas/profileSchema';

interface ProfileFormProps {
  initialData?: Partial<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData as ProfileFormValues
  });

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Editar Perfil</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nombre Completo" {...register('full_name')} error={errors.full_name?.message} />
        <textarea 
          className="w-full p-2 border border-gray-300 rounded-lg text-sm h-20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Tu biografía..."
          {...register('bio')}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nivel de Habilidad</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
            {...register('skill_level')}
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <Button type="submit" className="w-full" isLoading={isSubmitting}>Guardar Cambios</Button>
      </form>
    </Card>
  );
};
