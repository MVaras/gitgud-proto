import { z } from 'zod';

export const achievementSchema = z.object({
  title: z.string().min(3, { message: "Título muy corto" }),
  category: z.enum(['match', 'training', 'milestone', 'stats']),
  value: z.string().min(1, { message: "Valor requerido (ej: 2km, 3 victorias, 80kg)" }),
  note: z.string().optional(),
});

export type AchievementFormValues = z.infer<typeof achievementSchema>;
