import { z } from 'zod';

// Zod Schemas
export const emailSchema = z.string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .transform((email) => email.trim().toLowerCase());

export const wishlistFormSchema = z.object({
  email: emailSchema
});

// Type inference from schema
export type WishlistFormData = z.infer<typeof wishlistFormSchema>;

// Validation helpers
export const validateEmail = (email: string): { success: boolean; error?: string } => {
  const result = emailSchema.safeParse(email);
  return result.success 
    ? { success: true }
    : { success: false, error: result.error.errors[0]?.message };
};

export const validateWishlistForm = (data: unknown): { success: boolean; data?: WishlistFormData; error?: string } => {
  const result = wishlistFormSchema.safeParse(data);
  return result.success
    ? { success: true, data: result.data }
    : { success: false, error: result.error.errors[0]?.message };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};