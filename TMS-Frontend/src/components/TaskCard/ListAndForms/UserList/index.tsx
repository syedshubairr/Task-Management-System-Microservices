import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, useEffect } from "react";
import { ModalProps, userType } from "./types";
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { getUsersList } from "../../../../services/AuthService";
import { assignTaskToUser } from "../../../../services/TaskService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
};

const UserList: FC<ModalProps> = ({ handleClose, open }) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const handleAssignTask = (user: userType) => {
    const params = new URLSearchParams(location.search);
    const taskId = Number(params.get("taskId"));
    dispatch(assignTaskToUser({ userId: user.id, taskId: taskId }));
  };
  useEffect(() => {
    dispatch(getUsersList(localStorage.getItem("jwt")));
  }, [dispatch]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth.users.map((user, index) => (
            <div key={index}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.fullName}
                      secondary={user.email}
                    />
                  </ListItem>
                </div>
                <div>
                  <Button
                    onClick={() => handleAssignTask(user)}
                    className="customButton"
                  >
                    Select
                  </Button>
                </div>
              </div>
              {index != auth.users.length - 1 && <Divider variant="inset" />}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default UserList;
