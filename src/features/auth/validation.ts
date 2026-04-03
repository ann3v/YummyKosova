import { z } from 'zod';

import type { MessageCatalog } from '@/src/i18n/messages';

type AuthMessages = MessageCatalog['auth'];

export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function createSignInSchema(auth: AuthMessages) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, auth.validationEmailRequired)
      .email(auth.validationEmailInvalid),
    password: z
      .string()
      .min(1, auth.validationPasswordRequired)
      .min(6, auth.validationPasswordMin),
  });
}

export function createSignUpSchema(auth: AuthMessages) {
  return z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1, auth.validationFullNameRequired)
        .min(2, auth.validationFullNameMin),
      email: z
        .string()
        .trim()
        .min(1, auth.validationEmailRequired)
        .email(auth.validationEmailInvalid),
      password: z
        .string()
        .min(1, auth.validationPasswordRequired)
        .min(6, auth.validationPasswordMin),
      confirmPassword: z
        .string()
        .min(1, auth.validationConfirmPasswordRequired),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: auth.validationPasswordsMatch,
      path: ['confirmPassword'],
    });
}
