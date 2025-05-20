import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";
import DeleteConfirmModal from "../modals/common/DeleteConfirmModal";

const Sidebar: React.FC = () => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = localStorage.getItem("user");
  const userRole = user ? JSON.parse(user).role : null;

  const navItems = [
    { name: "Overview", path: "/dashboard/overview", roles: ["ADMIN"] },
    { name: "Vehicles", path: "/dashboard/vehicles", roles: ["USER"] },
    { name: "Slots", path: "/dashboard/slots", roles: ["ADMIN"] },
    { name: "Requests", path: "/dashboard/requests", roles: ["ADMIN", "USER"] },
    { name: "Users", path: "/dashboard/users", roles: ["ADMIN"] },
  ];

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <>
      <div className="lg:hidden flex justify-between items-center p-4 bg-white">
        <img src={logo} alt="Logo" className="h-10" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <aside
  className={`
    fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-8 transition-transform transform
    lg:translate-x-0 ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    }
    lg:relative lg:flex lg:flex-col rounded-tr-3xl rounded-br-3xl z-50
  `}
>
  <div className="mb-10 text-center">
    <h1 className="font-extrabold text-2xl text-purple-700">Nyabihu Parking</h1>
  </div>

  <nav className="flex flex-col gap-3">
    {navItems
      .filter((item) => item.roles.includes(userRole))
      .map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `block px-5 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "hover:bg-purple-100 text-gray-700"
            }`
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {item.name}
        </NavLink>
      ))}
  </nav>

  <div className="mt-auto pt-10">
    <Button
      variant="outline"
      onClick={confirmLogout}
      className="w-full px-5 py-3 rounded-xl border border-gray-300 hover:border-purple-600 text-black hover:bg-purple-50"
    >
      Logout
    </Button>
  </div>

  <DeleteConfirmModal
    isOpen={isLogoutConfirmOpen}
    onOpenChange={setIsLogoutConfirmOpen}
    onConfirm={handleLogout}
    title="Confirm Logout"
    description="Are you sure you want to logout? This action cannot be undone."
    confirmText="Logout"
    loadingText="Logging out ..."
  />
</aside>

    </>
  );
};

export default Sidebar;
