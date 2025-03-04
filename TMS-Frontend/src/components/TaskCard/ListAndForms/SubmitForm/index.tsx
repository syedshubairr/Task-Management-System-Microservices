/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, useState } from "react";
import { Button, Grid2, TextField } from "@mui/material";
import { FormData, ModalProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import BackdropLoader from "../../../BackdropLoader";
import { submitTask } from "../../../../services/SubmissionService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SubmitForm: FC<ModalProps> = ({ handleClose, open, taskId }) => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    githubLink: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    // TODO: The tags are being updated in UI but not in API.
    e.preventDefault();
    dispatch(submitTask({ taskId, githubLink: formData.githubLink }));
    handleClose(false);
  };
  return (
    <div>
      {task.loading ? (
        <BackdropLoader isOpen={task.loading} />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={2} alignItems={"center"}>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    label="Github Link"
                    name="githubLink"
                    fullWidth
                    value={formData.githubLink}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    className="customButton"
                    type="submit"
                    fullWidth
                    sx={{ padding: "0.9rem" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default SubmitForm;
