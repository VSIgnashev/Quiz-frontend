import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const refresh = async () => {
    const requestOptions = {
      url: "/auth/refreshToken",
      method: "post",
      headers: { "Content-Type": "application/json", authtoken: auth.token },
    };

    const response = await axios.request(requestOptions);

    setAuth(() => {
      return {
        token: response.data.token,
      };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
