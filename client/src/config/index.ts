import { AddProductFormElement, FormControl as FromControl } from "@/types";
import {
  FilterOption,
  FilterOptions,
} from "@/types/filter-options.interface.ts";
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
    name: "title",
    label: "Product Title",
    placeholder: "Enter product title",
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

export const shoppingViewHeaderMenuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi's",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions: FilterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions: FilterOption[] = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
