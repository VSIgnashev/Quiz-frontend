import { Outlet } from "react-router-dom";
import { React, useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import useGetMe from "../../hooks/useGetMe";
import { axiosPrivate } from "../../api/axios";

const START_SESSION_URL = "/auth/startSession";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const getMe = useGetMe();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        await getMe();
      } catch (error) {
        const response = await axiosPrivate.get(START_SESSION_URL);

        setAuth(response.data.token);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
