import { Dayjs } from "dayjs";

export interface ModalProps {
  handleClose: (isOpen: boolean) => void;
  open: boolean;
  taskId: number;
}
export type FormData = {
  title: string;
  image: string;
  description: string;
  tags: string[];
  deadline: Dayjs | null | Date;
};
