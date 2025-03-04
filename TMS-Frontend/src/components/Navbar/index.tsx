import { Avatar } from "@mui/material";
import "./style.css";
import { useAppSelector } from "../../redux/store";
const Navbar = () => {
  const { user } = useAppSelector((store) => store.auth);
  return (
    <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center w-full">
      <p className="font-bold text-lg">Task Management System</p>
      <div className="flex items-center gap-5">
        <p>{user?.fullName}</p>
        <Avatar src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" />
      </div>
    </div>
  );
};

export default Navbar;
