import { AddProductFormElement, FormControl as FromControl } from "@/types";
import { LayoutDashboard, ListOrdered, ShoppingBasket } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType;
};

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

export const adminSidebarMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: ListOrdered,
  },
];

export const addProductFormElements: AddProductFormElement[] = [
  {
    name: "name",
    label: "Product Name",
    placeholder: "Enter product name",
    type: "text",
    componentType: "input",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    type: "textarea",
    componentType: "input",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select category",
    type: "select",
    componentType: "select",
    options: [
      {
        text: "Men",
        value: "men",
      },
      {
        text: "Women",
        value: "women",
      },
      {
        text: "Kids",
        value: "kids",
      },
      {
        text: "Accessories",
        value: "accessories",
      },
      {
        text: "Footwear",
        value: "footwear",
      },
    ],
  },
  {
    name: "image",
    label: "Image",
    placeholder: "Upload product image",
    type: "file",
    componentType: "input",
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    type: "select",
    options: [
      { value: "nike", text: "Nike" },
      { value: "adidas", text: "Adidas" },
      { value: "puma", text: "Puma" },
      { value: "levi", text: "Levi's" },
      { value: "zara", text: "Zara" },
      { value: "h&m", text: "H&M" },
    ],
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    type: "number",
    componentType: "input",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter sale price (if applicable)",
    type: "number",
    componentType: "input",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    placeholder: "Enter total stock",
    type: "number",
    componentType: "input",
  },
];
