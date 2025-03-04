import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import { useState } from "react";

export default function BackdropLoader({ isOpen }: { isOpen: boolean }) {
  // const [open, setOpen] = useState<boolean>(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isOpen}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
