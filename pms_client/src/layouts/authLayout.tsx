import React from "react";
import { Outlet } from "react-router-dom";
import welcome from "../assets/page-parking-lot.png";

const AuthLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${welcome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for a slight dark effect */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      {/* Forms will float above the background */}
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;