export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface LoginRequest {
  /** Acepta correo o nombre */
  identifier: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  exp: number; // epoch ms
  user: User;
}
