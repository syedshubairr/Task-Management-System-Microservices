import { Dayjs } from "dayjs";

export interface taskDataType {
  title: string;
  description: string;
  image: string;
  tags: string[];
  deadline: Dayjs | null | Date;
}

export enum TaskStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  DONE = "DONE",
}
