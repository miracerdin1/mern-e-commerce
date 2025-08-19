import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin-view/sidebar.tsx";
import AdminHeader from "@/components/admin-view/header.tsx";
import { useState } from "react";

function AdminLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
