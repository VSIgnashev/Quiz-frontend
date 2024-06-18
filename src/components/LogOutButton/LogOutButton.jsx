import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const LOGOUT_URL = "/auth/logout";

function LogOutButton() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const { setIsLogged } = useAuth();

  const logOut = async () => {
    await axiosPrivate.post(LOGOUT_URL).then(() => {
      setAuth();
      setIsLogged(false);
    });
  };

  return (
    <button className="" onClick={() => logOut()}>
      LogOut
    </button>
  );
}

export default LogOutButton;
