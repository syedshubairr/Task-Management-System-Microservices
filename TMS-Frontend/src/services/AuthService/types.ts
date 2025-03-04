export interface userDataType {
  email: string;
  password: string;
}
export interface authResponse {
  jwt: string;
  message: string;
  status: boolean;
}
export interface registerProps {
  email: string;
  password: string;
  role: "ROLE_ADMIN" | "ROLE_USER" | "";
  fullName: string;
}
