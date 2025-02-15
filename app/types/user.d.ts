export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  points: number;
  avatarUrl: string;
  profileUrl?: string;
}
