export type Difficulty = "easy" | "medium" | "hard";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  posts?: Post[];
}

export interface Quiz {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

export interface CompletedPost {
  id: string;
  userId: string;
  postId: string;
  completedAt: Date;
  isSuccess: boolean;
  post?: Post;
  user?: User;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  createdAt: Date;
  images: string[];
  published: boolean;
  updatedAt: Date;
  userId?: string | null;
  sandboxUrl?: string;
  sandboxTemplate?: SandboxTemplate;
  quizId?: string | null;
  difficulty?: Difficulty | null;
  comments?: Comment[];
  CompletedPost?: CompletedPost[];
  category?: Category;
  quiz?: Quiz | null;
  User?: User | null;
  description?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  postId: string;
  userId: string;
  post?: Post;
  user?: User;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user?: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user?: User;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  provider: string;
  stripeCustomerId?: string | null;
  subscriptionStatus: string;
  points: number;
  createdAt: Date;
  emailVerified?: Date | null;
  profileUrl?: string | null;
  accounts?: Account[];
  Comment?: Comment[];
  completedPosts?: CompletedPost[];
  Post?: Post[];
  sessions?: Session[];
}
