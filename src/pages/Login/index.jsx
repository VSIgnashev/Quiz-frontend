import { useState, useEffect, useRef, React } from "react";
import styles from "./Login.module.scss";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const LOGIN_URL = "/auth/login";

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();

  const { setIsLogged } = useAuth();
  const emailRef = useRef();

  const [email, setEmail] = useState();
  const [emailFocus, setEmailFocus] = useState();
  const [validEmail, setValidEmail] = useState();
  const [password, setPassword] = useState();

  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => setErrorMessage(""), [email, password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email: email, password: password };
      setEmail("");
      setPassword("");

      const resolve = await axios.post(LOGIN_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setAuth({
        token: resolve.data.token,
      });

      setIsLogged(true);

      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="">
            <img src="/icons/trademark_logo.svg" alt="" />
          </div>
          <div className="mt-3 text-[32px] font-bold">Sign up for HONK</div>
        </div>
        <div className="mt-4 gap-y-1.5 flex flex-col">
          <button className={styles.socialAuthButton}>
            <img src="./icons/google_logo.svg" alt="" />
            Continue with Google
          </button>
          <button className={styles.socialAuthButton}>
            <img src="/icons/apple_logo.svg" alt="" />
            Continue with Apple
          </button>
          <button className={styles.socialAuthButton}>
            <img src="/icons/facebook_logo.svg" alt="" />
            Continue with Facebook
          </button>
        </div>
        <div className="mx-auto mt-[14px]">or</div>
        <div
          className={
            errorMessage
              ? "w-[415px] h-[70px] rounded-[4px] border-2 border-black bg-[#C6C6C6] flex items-center justify-center "
              : "absolute left-[-9999px]"
          }
        >
          {errorMessage}
        </div>
        <form
          className="flex flex-col gap-y-[7px] mt-[14px]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            ref={emailRef}
            className={styles.inputForm}
            placeholder="Email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          ></input>
          <p
            id="emailReq"
            className={
              email && emailFocus && !validEmail
                ? "block"
                : "absolute left-[-9999px]"
            }
            style={emailFocus ? { display: "block" } : { display: "none" }}
          >
            Enter your email
          </p>
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            className={styles.inputForm}
            placeholder="Password"
          ></input>
          <button className={styles.signUpButton} disabled={!validEmail}>
            Continue
          </button>
        </form>
        <div className="mt-[27px]  w-[144px] text-[#737373] text-sm font-medium">
          Need help signing in?{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
