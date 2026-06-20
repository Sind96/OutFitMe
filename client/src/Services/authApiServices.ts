import type {
  AuthResponse,
  LoginFormData,
  LogoutResponse,
  MessageResponse,
  SignUpFormData,
  UpdateUserFormData,
  UpdateUserResponse,
} from "../Types/auth.types";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
};

const signUp = async (formData: SignUpFormData): Promise<AuthResponse> => {
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse<AuthResponse>(response);
};

const logIn = async (formData: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse<AuthResponse>(response);
};

const logOut = async (): Promise<LogoutResponse> => {
  const response = await fetch(`${baseURL}/logout`);

  return handleResponse<LogoutResponse>(response);
};

const deleteUser = async (
  id: string,
  token: string,
): Promise<MessageResponse> => {
  const response = await fetch(`${baseURL}/profile/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return handleResponse<MessageResponse>(response);
};

const updateUser = async (
  id: string,
  token: string,
  updates: UpdateUserFormData,
): Promise<UpdateUserResponse> => {
  const response = await fetch(`${baseURL}/profile/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updates),
  });

  return handleResponse<UpdateUserResponse>(response);
};

export { signUp, logIn, logOut, deleteUser, updateUser };
