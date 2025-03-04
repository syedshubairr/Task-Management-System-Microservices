import { useState, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./style.css";
import { TaskCardType } from "./types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteTask } from "../../services/TaskService";
import BackdropLoader from "../BackdropLoader";
import SubmitForm from "./ListAndForms/SubmitForm";

const UserList = lazy(() => import("./ListAndForms/UserList"));
const EditTaskForm = lazy(() => import("./ListAndForms/EditTaskForm"));
const SubmissionList = lazy(() => import("./ListAndForms/SubmissionList"));
const TaskCard = ({ task }: TaskCardType) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openUserList, setOpenUserList] = useState<boolean>(false);
  const [openSubmissionList, setOpenSubmissionList] = useState<boolean>(false);
  const [openSubmitFormModel, setOpenSubmitFormModel] =
    useState<boolean>(false);
  const [openEditTaskForm, setOpenEditTaskForm] = useState<boolean>(false);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id.toString());
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmitFormModel(true);
    handleMenuClose();
  };
  const handleCloseSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");
    navigate(updatedParams.toString());
    setOpenSubmitFormModel(false);
  };

  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id.toString());
    navigate(`${location.pathname}?${updatedParams}`);
    setOpenSubmissionList(true);
    handleMenuClose();
  };
  const handleCloseSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");
    navigate(updatedParams.toString());
    setOpenSubmissionList(false);
  };

  const handleOpenUpdateTaskForm = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id.toString());
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenEditTaskForm(true);
    handleMenuClose();
  };
  const handleCloseUpdateTaskForm = () => {
    setOpenEditTaskForm(false);
    navigate(`${location.pathname}`);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    handleMenuClose();
  };

  const handleUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id.toString());
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };
  const handleCloseUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");
    navigate(updatedParams.toString());
    setOpenUserList(false);
  };
  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div className="border-2">
            <img
              className="lg:w-[7rem] lg:h-[7rem] object-cover"
              src={task.image}
              alt="car-rental"
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{task.title}</h1>
              <p className="text-gray-500 text-sm">{task.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {task.tags.map((tag: string, index) => (
                <span className="py-1 px-5 rounded-full techStack" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user?.role === "ROLE_ADMIN" ? (
              <div>
                <MenuItem onClick={handleUserList}>Assign User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submission
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskForm}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </div>
            ) : (
              <>
                <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
      <Suspense fallback={<BackdropLoader isOpen={true} />}>
        <UserList open={openUserList} handleClose={handleCloseUserList} />
      </Suspense>
      <Suspense fallback={<BackdropLoader isOpen={true} />}>
        {openSubmissionList && (
          <SubmissionList
            open={openSubmissionList}
            handleClose={handleCloseSubmissionList}
          />
        )}
      </Suspense>
      <Suspense fallback={<BackdropLoader isOpen={true} />}>
        {openEditTaskForm && (
          <EditTaskForm
            open={openEditTaskForm}
            handleClose={handleCloseUpdateTaskForm}
            taskId={task.id}
          />
        )}
      </Suspense>
      <Suspense fallback={<BackdropLoader isOpen={true} />}>
        {openSubmitFormModel && (
          <SubmitForm
            open={openSubmitFormModel}
            handleClose={handleCloseSubmitFormModel}
            taskId={task.id}
          />
        )}
      </Suspense>
    </div>
  );
};

export default TaskCard;
