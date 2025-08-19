import { Dispatch, SetStateAction } from "react";

export interface AdminSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
