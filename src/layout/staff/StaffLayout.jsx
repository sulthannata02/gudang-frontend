import { Outlet } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";

export default function StaffLayout({ children }) {
  return (
    <div className="flex">
      <StaffSidebar />
      <div className="ml-64 w-full p-8 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
