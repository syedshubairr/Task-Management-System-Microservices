import { Dayjs } from "dayjs";

export interface userInitialState {
  user: null | userType;
  loggedIn: boolean;
  loading: boolean;
  error: null | string | undefined;
  jwt: null | string;
  users: userType[];
}

type userType = {
  id: number;
  password: string;
  email: string;
  role: "ROLE_ADMIN" | "ROLE_CUSTOMER";
  fullName: string;
};

enum TaskStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  DONE = "DONE",
}
type taskType = {
  id: number;
  title: string;
  description: string;
  image: string;
  assignedUserId: number;
  tags: string[];
  deadline: Dayjs | null;
  createdAt: string;
  status: TaskStatus;
};
export type taskInitialState = {
  tasks: taskType[];
  loading: boolean;
  error: null | string | undefined;
  taskDetails: null | taskType;
  userTasks: taskType[];
};
export type submissionInitialState = {
  submissions: Submission[];
  status: "PENDING" | "SUCCEEDED" | "FAILED";
  error: null | string | undefined;
};
enum SubmissionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

type Submission = {
  id: number;
  taskId: number;
  githubLink: string;
  userId: number;
  status: SubmissionStatus;
  submissionTime: string;
};
