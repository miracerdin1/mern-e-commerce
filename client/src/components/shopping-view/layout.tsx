import ShoppingHeader from "@/components/shopping-view/header.tsx";
import { Outlet } from "react-router-dom";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white">
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
