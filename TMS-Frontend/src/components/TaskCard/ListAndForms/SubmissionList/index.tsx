import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalProps } from "./types";
import { FC, useEffect } from "react";
import SubmissionCard from "../../../SubmissionCard";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { fetchSubmissionByTaskId } from "../../../../services/SubmissionService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmissionList: FC<ModalProps> = ({ handleClose, open }) => {
  const params = new URLSearchParams(location.search);
  const taskId = Number(params.get("taskId"));
  const dispatch = useAppDispatch();
  const { submission } = useAppSelector((state) => state);
  console.log("task id by shubair", taskId);
  useEffect(() => {
    if (taskId) dispatch(fetchSubmissionByTaskId({ taskId }));
  }, [dispatch, taskId]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submission.submissions.length > 0 ? (
              <div className="space-y-2">
                {submission.submissions.map((sub, index) => (
                  <SubmissionCard
                    githubLink={sub.githubLink}
                    status={sub.status}
                    submissionTime={sub.submissionTime}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-center">No Submission Found</div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmissionList;
