import { Fragment } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "@/config";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet.tsx";
import { AdminSidebarProps } from "@/components/admin-view/types";

function MenuItems({ setOpen }: { setOpen?: (open: boolean) => void }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((item) => {
        console.log("icon", item.icon);
        return (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted transition-colors duration-200"
          >
            {item.icon && <item.icon size={20} />}
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        {/*<Sheet.Trigger className="lg:hidden sm:block">*/}
        {/*  <ChartNoAxesCombined size={30} />*/}
        {/*  <span className="sr-only">Toggle Menu</span>*/}
        {/*</Sheet.Trigger>*/}
        <SheetContent side="left" className="w-64 p-6">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 my-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
