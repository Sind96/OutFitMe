export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
};
