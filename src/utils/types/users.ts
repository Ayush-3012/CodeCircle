export interface RegisterFormData {
  name: string;
  username: string;
  email?: string;
  password?: string;
  image?: File | string;
  bio?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
}
