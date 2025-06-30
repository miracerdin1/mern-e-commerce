import { FormControl as FromControl } from "@/types";

export const registerFormControls: FromControl[] = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your name",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const loginFormControls: FromControl[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];
