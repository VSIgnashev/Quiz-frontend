import useAuth from "./useAuth";

import useAxiosPrivate from "./useAxiosPrivate";

const useGetMe = () => {
  const { setAuth } = useAuth();
  const { setIsLogged } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const getMe = async () => {
    const requestOptions = {
      url: "/auth/getMe",
      method: "get",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axiosPrivate.request(requestOptions);

      setIsLogged(true);
      setAuth((prev) => {
        const newAuth = {
          ...prev,
          username: response.data.username,
          email: response.data.email,
        };
        return newAuth;
      });
    } catch (error) {
      console.log();
    }
  };

  return getMe;
};

export default useGetMe;
