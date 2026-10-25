import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Nombre muy corto" }),
  bio: z.string().max(200, { message: "Máximo 200 caracteres" }),
  skill_level: z.enum(['beginner', 'intermediate', 'advanced']),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
