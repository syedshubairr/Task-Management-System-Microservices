export interface AuthFormProps {
  togglePanel: () => void;
}
export type RegisterType = {
  email: string;
  password: string;
  fullName: string;
  role: "ROLE_ADMIN" | "ROLE_USER" | "";
};
export type LoginType = {
  email: string;
  password: string;
};
export type validationType = {
  email: string;
  password: string;
  fullName?: string;
  role?: "ROLE_ADMIN" | "ROLE_USER" | "";
};
