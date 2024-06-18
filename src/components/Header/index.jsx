import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserDropdown from "../UserDropdown/UserDropdown";

function Header() {
  const { auth } = useAuth();
  const { isLogged } = useAuth();

  return (
    <header className="flex justify-between pt-[13px] pl-[22px] pr-[31px]">
      <Link to="/">
        <div className="logo-block flex items-center gap-x-[17px]">
          <img
            className="h-[26px] w-[26px]"
            src="/icons/trademark_logo.svg"
            alt="trademark logo"
          />

          <span className="font-bold text-sm">Honk honk</span>
        </div>
      </Link>
      {isLogged ? (
        <UserDropdown />
      ) : (
        <div className={"buttons-block flex"}>
          <Link to="/login">
            <button className="font-bold text-sm h-7 w-[164px] rounded-sm border-none">
              Log in
            </button>
          </Link>
          <>{auth?.email}</>
          <Link to="/Registration">
            <button className="font-bold text-sm h-7 w-[164px] rounded-sm bg-black text-white ">
              Sign in
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
