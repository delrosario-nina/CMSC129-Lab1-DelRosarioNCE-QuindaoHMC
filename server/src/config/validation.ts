import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const createStorySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters")
    .trim(),
  synopsis: z
    .string()
    .max(2000, "Synopsis must be at most 2000 characters")
    .optional()
    .default(""),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000000, "Content must be at most 1,000,000 characters"),
  genres: z.array(z.string()).max(10, "Maximum 10 genres allowed").default([]),
  tags: z.array(z.string()).max(50, "Maximum 50 tags allowed").default([]),
});

export const updateStorySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters")
    .trim()
    .optional(),
  synopsis: z
    .string()
    .max(2000, "Synopsis must be at most 2000 characters")
    .optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000000, "Content must be at most 1,000,000 characters")
    .optional(),
  genres: z.array(z.string()).max(10, "Maximum 10 genres allowed").optional(),
  tags: z.array(z.string()).max(50, "Maximum 50 tags allowed").optional(),
});

export const addToLibrarySchema = z.object({
  storyId: z
    .string()
    .min(1, "Story ID is required")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid story ID format"),
});

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue: z.ZodIssue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return { valid: false, errors, data: null };
  }
  return { valid: true, errors: [], data: result.data as T };
};
