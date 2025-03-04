export interface ModalProps {
  handleClose: (isOpen: boolean) => void;
  open: boolean;
  taskId: number;
}
export type FormData = {
  githubLink: string;
  description: string;
};
