import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { AuthFormProps, RegisterType, validationType } from "./types";
import { useAppDispatch } from "../../redux/store";
import { register } from "../../services/AuthService";
import { validateForm } from "./utils";

const RegisterForm: FC<AuthFormProps> = ({ togglePanel }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<RegisterType>({
    fullName: "",
    role: "ROLE_USER",
    email: "",
    password: "",
  });
  const [error, setError] = useState<validationType>({
    email: "",
    password: "",
    fullName: "",
    role: "ROLE_USER",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(formData, setError)) {
      dispatch(register(formData));
      console.log("Signup Form Data", formData);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          type="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your Full Name..."
          error={!!error.fullName}
          helperText={error.fullName}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email..."
          error={!!error.email}
          helperText={error.email}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password..."
          error={!!error.password}
          helperText={error.password}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"ROLE_USER"}>USER</MenuItem>
            <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            className="customButton"
            type="submit"
            fullWidth
            sx={{ padding: "0.9rem" }}
          >
            Register
          </Button>
        </div>
      </form>
      <div className="mt-3 flex items-center gap-2 py-5 justify-center">
        <span>Already have an account?</span>
        <Button onClick={togglePanel}>Login</Button>
      </div>
    </div>
  );
};

export default RegisterForm;
