import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),

  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type SignInData = z.infer<typeof signInSchema>;
