import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-8 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
