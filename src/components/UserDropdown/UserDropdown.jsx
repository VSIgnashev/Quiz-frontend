import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/base";
import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function UserDropdown() {
  const { auth } = useAuth();

  return (
    <>
      <Dropdown>
        <div className="text-white w-[200px] bg-black rounded-md flex justify-center">
          <MenuButton>{auth.username}</MenuButton>
        </div>

        <Menu>
          <Link to="/yourQuizes">
            <div className="div w-[200px] pl-1 text-left rounded-md hover:bg-gray-200">
              <MenuItem>Your quizes</MenuItem>
            </div>
          </Link>

          <MenuItem>
            <div className="div w-[200px] pl-1 text-left rounded-md hover:bg-gray-200">
              <LogOutButton />
            </div>
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
