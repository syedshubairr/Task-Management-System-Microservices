import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { AuthFormProps, LoginType } from "./types";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../services/AuthService";
import { validateForm } from "./utils";

const LoginForm: FC<AuthFormProps> = ({ togglePanel }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginType>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // toast("Submit called");
    if (validateForm(formData, setErrors)) {
      dispatch(login(formData));
      console.log("Login Form Data", formData);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email..."
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password..."
          error={!!errors.password}
          helperText={errors.password}
        />
        <div>
          <Button
            className="customButton"
            type="submit"
            fullWidth
            sx={{ padding: "0.9rem" }}
          >
            Login
          </Button>
        </div>
      </form>
      <div className="mt-3 flex items-center gap-2 py-5 justify-center">
        <span>Don't have an account?</span>
        <Button onClick={togglePanel}>Register</Button>
      </div>
    </div>
  );
};

export default LoginForm;
