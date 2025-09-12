import { z } from "zod";

// User types
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Post types
export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// Blog types (from your existing API)
export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

// Message board types
export const MessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  timestamp: z.string(),
  likes: z.number().default(0),
});

export type Message = z.infer<typeof MessageSchema>;
