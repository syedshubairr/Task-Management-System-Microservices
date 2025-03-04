export type SubmissionType = {
  githubLink: string;
  status: SubmissionStatus;
  submissionTime: string;
};
export enum SubmissionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
