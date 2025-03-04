import { useState } from "react";
import "./styles.css";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { TabPanel } from "../../components/TabPanel";
import LoginForm from "../../components/AuthForms/LoginForm";
import RegisterForm from "../../components/AuthForms/RegisterForm";

const Auth = () => {
  const theme = useTheme();
  const [onRegister, setOnRegister] = useState<boolean>(false);
  const togglePanel = () => {
    setOnRegister(!onRegister);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
      className: "text-lg font-semibold",
    };
  }
  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      <div className="box lg:max-w-3xl rounded-xl">
        <Box>
          <Tabs
            value={Number(onRegister)}
            onChange={togglePanel}
            variant="fullWidth"
            aria-label="Login and Register Tabs"
            className="pb-5"
          >
            <Tab
              sx={{ fontWeight: 600, fontSize: 20 }}
              label="Login"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: 600, fontSize: 20 }}
              label="Register"
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanel value={Number(onRegister)} index={0} dir={theme.direction}>
            <LoginForm togglePanel={togglePanel} />
          </TabPanel>
          <TabPanel value={Number(onRegister)} index={1} dir={theme.direction}>
            <RegisterForm togglePanel={togglePanel} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Auth;
