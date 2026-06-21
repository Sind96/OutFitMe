export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user?: User;
}

export interface UpdateUserFormData {
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export interface MessageResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
  accessToken: null;
}

export interface UpdateUserResponse {
  message: string;
  user: User;
}
