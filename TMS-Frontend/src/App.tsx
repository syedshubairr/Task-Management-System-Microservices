import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme/darkTheme";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { getUserProfile } from "./services/AuthService";

function App() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  useEffect(() => {
    // TODO: Get User profile handling when JWT is not provided, with ERROR on page.
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt") || ""));
  }, [auth.jwt]);
  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
          <ToastContainer />
        </div>
      ) : (
        <>
          <Auth />
          <ToastContainer />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
