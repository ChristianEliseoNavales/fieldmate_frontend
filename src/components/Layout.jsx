import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar"; 

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(true); // default expanded

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main className="flex-1 ml-[110px] transition-all duration-500 ease-in-out" style={{ marginLeft: isExpanded ? 400 : 110 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
