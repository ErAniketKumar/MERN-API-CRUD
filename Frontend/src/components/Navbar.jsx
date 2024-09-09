import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="px-10 shadow-md">
        <div className="flex justify-between py-4">
          <div>Aniket</div>
          <div className="flex space-x-4">
            <NavLink to="/">ShowAll</NavLink>
            <NavLink to="/create">Create</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;