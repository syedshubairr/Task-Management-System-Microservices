export interface ModalProps {
  handleClose: (isOpen: boolean) => void;
  open: boolean;
}
export type userType = {
  id: number;
  password: string;
  email: string;
  role: "ROLE_ADMIN" | "ROLE_CUSTOMER";
  fullName: string;
};
