import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, { message: "Título muy corto" }),
  content: z.string().min(5, { message: "Contenido muy corto" }),
});

export type PostFormValues = z.infer<typeof postSchema>;
