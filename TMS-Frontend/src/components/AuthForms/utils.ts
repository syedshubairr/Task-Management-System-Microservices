import { validationType } from "./types";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isValidFullName = (fullName: string) => {
  const fullNameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  return fullNameRegex.test(fullName);
};
export const validateForm = (
  formData: validationType,
  setErrors: (data: validationType) => void
) => {
  let newErrors = null;
  let isValid = true;
  if (formData.fullName && formData.fullName.length > 0) {
    newErrors = { email: "", password: "", fullName: "" };
  } else {
    newErrors = { email: "", password: "" };
  }
  // Email validation
  if (!formData.email) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = "Please enter a valid email address";
    isValid = false;
  }
  // full name validation if exist
  if (!formData.fullName) {
    newErrors.fullName = "Email is required";
    isValid = false;
  } else if (!isValidFullName(formData.fullName)) {
    newErrors.fullName = "Please enter a valid Name";
    isValid = false;
  }
  // Password validation
  if (!formData.password) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length <= 8) {
    newErrors.password = "Password must be longer than 8 characters";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
