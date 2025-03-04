export const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "Done", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  {
    name: "Assigned",
    value: "ASSIGNED",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Not Assigned",
    value: "PENDING",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Create New Task",
    value: "",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Notification",
    value: "NOTIFICATION",
    role: ["ROLE_CUSTOMER"],
  },
];
