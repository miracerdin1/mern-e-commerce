import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { AdminSidebarProps } from "@/components/admin-view/types";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }: AdminSidebarProps) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b ">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle MEnu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
