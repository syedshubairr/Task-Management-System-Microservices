import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import { FC } from "react";
import { SubmissionStatus, SubmissionType } from "./types";
import { useAppDispatch } from "../../redux/store";
import { acceptDeclineSubmission } from "../../services/SubmissionService";
import { convertDate } from "../../utils";

const SubmissionCard: FC<SubmissionType> = ({
  githubLink,
  status,
  submissionTime,
}) => {
  const dispatch = useAppDispatch();
  const handleAcceptOrReject = (status: "DONE" | "PENDING") => {
    const params = new URLSearchParams(location.search);
    const taskId = Number(params.get("taskId"));
    dispatch(acceptDeclineSubmission({ taskId: Number(taskId), status }));
  };
  return (
    <div className="rounded-md gb-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>Github: </span>
          <div className="flex items-center gap-2 text-[#c24dd0] hover:text-gray-300 transition-colors duration-300">
            <OpenInNewIcon />
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              Go to link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs ">
          <p>Submission Time: </p>
          <p className="text-gray-400">{convertDate(submissionTime)}</p>
        </div>
      </div>
      <div>
        {status === SubmissionStatus.PENDING ? (
          <div className="flex gap-5">
            <div className="text-green-500">
              <IconButton
                color="success"
                onClick={() => handleAcceptOrReject("DONE")}
              >
                <CheckIcon />
              </IconButton>
            </div>
            <div className="text-red-500">
              <IconButton
                color="error"
                onClick={() => handleAcceptOrReject("PENDING")}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color={
              status !== SubmissionStatus.PENDING.toString()
                ? "success"
                : "error"
            }
          >
            {status !== SubmissionStatus.PENDING.toString()
              ? "Accepted"
              : "Rejected"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
