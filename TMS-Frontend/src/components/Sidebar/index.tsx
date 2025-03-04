import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { menu } from "./utils";
import "./style.css";
import CreateNewTaskForm from "../TaskCard/ListAndForms/CreateTaskForm";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../services/AuthService";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openCreateTaskForm, setCreateEditTaskForm] = useState<boolean>(false);
  const handleOpenCreateTaskForm = () => {
    setCreateEditTaskForm(true);
  };
  const handleCloseCreateTaskForm = () => {
    setCreateEditTaskForm(false);
  };
  const handleMenuChange = (menuItem: string) => {
    const updatedParams = new URLSearchParams(location.search);
    if (menuItem == "Create New Task") {
      handleOpenCreateTaskForm();
    } else if (menuItem == "Home") {
      const updatedPath = location.pathname; // Just use pathname since no params
      navigate(updatedPath);
    } else {
      updatedParams.set("filter", menuItem.toUpperCase());
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }
    setActiveMenu(menuItem);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[#c24dd0]"
              src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            />
          </div>
          {menu
            .filter((item) => item.role.includes("ROLE_ADMIN"))
            .map((item) => (
              <p
                key={item.value}
                onClick={() => handleMenuChange(item.name)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}
          <Button fullWidth className="logoutButton" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default Sidebar;
