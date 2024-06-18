import { useEffect, useRef, useState, React } from "react";
import styles from "./Registration.module.scss";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/auth/register";

const Registration = () => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [registrationComplete, setRegistrationComplete] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

  const [username, setUsername] = useState();
  const [validName, setValidName] = useState();
  const [usernameFocus, setUsernameFocus] = useState();

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState();
  const [emailFocus, setEmailFocus] = useState();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const [password, setPassword] = useState();
  const [validPassword, setValidPassword] = useState();
  const [passwordFocus, setPasswordFocus] = useState();

  const [confirmPassword, setConfirmPassword] = useState();
  const [validConfirmPassword, setValidConfirmPassword] = useState();
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState();

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidConfirmPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [username, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid Entry");
      return;
    }
    try {
      const payload = { username, password, email };
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      await axios.post(REGISTER_URL, payload);
      setRegistrationComplete(true);
    } catch (error) {
      ("error");
      error;
      if (!error?.response) {
        setErrorMessage("No server responsee");
      } else if (error.response?.data?.error === "Email already taken") {
        setErrorMessage("Email already taken");
      } else if (error.response?.data?.error === "Username already taken") {
        setErrorMessage("Username already taken");
      } else {
        setErrorMessage("Registration failed");
      }
    }
  };

  const registrate = () => {
    axios
      .post("/auth/register", {
        username: "QQQQQ",
        email: "Qqqqqq@gmail.com",
        password: "QQQQ",
      })
      .then(() => "Registration complete");
  };

  return (
    <>
      {registrationComplete ? (
        <div className="mt-[160px] flex justify-center items-center flex-col">
          <div className="font-extrabold text-[70px]">
            Registration
            <br />
            complete!
          </div>
          <Link to="/">
            <button className="mt-[140px] cursor-pointer rounded-md text-white bg-black  font-extrabold text-[70px] px-[122px] py-[22px]">
              Start journey!
            </button>
          </Link>
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center">
            <div className="flex flex-col mt-[119px] ">
              <div className="flex flex-col items-center">
                <div className="">
                  <img src="/icons/trademark_logo.svg" alt="" />
                </div>
                <div className="mt-3 text-[32px] font-bold">
                  Sign up for HONK
                </div>
              </div>
              {/* <div className="mt-4 gap-y-1.5 flex flex-col">
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
              <div className="mx-auto mt-[14px]">or</div> */}
              <div className="mx-auto mt-[14px]">
                <div
                  className={
                    errorMessage
                      ? "w-[415px] h-[70px] rounded-[4px] border-2 border-black bg-[#C6C6C6] flex items-center justify-center "
                      : "absolute left-[-9999px]"
                  }
                >
                  <div className="">{errorMessage}</div>
                </div>
                <form
                  className="flex flex-col gap-y-[7px] mt-[7px]"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="username" className="hidden">
                    Username:
                  </label>
                  <input
                    className={styles.inputForm}
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="usernameReq"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    placeholder="Username"
                  />
                  <p
                    id="usernameReq"
                    className={
                      usernameFocus && username && !validName
                        ? "block"
                        : "absolute left-[-9999px]"
                    }
                  >
                    First stymbol of username must be letter
                    <br />
                    Username can contain leters, numbers, and underscore
                    <br />
                    Length of username must be between 3 and 23 symbols
                  </p>
                  <label htmlFor="Email" className="hidden">
                    Email
                  </label>
                  <input
                    className={styles.inputForm}
                    type="email"
                    id="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailReq"
                    onFocus={() => {
                      setEmailFocus(true);
                    }}
                    onBlur={() => {
                      setEmailFocus(false);
                    }}
                    placeholder="Email"
                  />
                  <p
                    id="emailReq"
                    className={
                      email && emailFocus && !validEmail
                        ? "block"
                        : "absolute left-[-9999px]"
                    }
                    style={
                      emailFocus ? { display: "block" } : { display: "none" }
                    }
                  >
                    Enter your email
                  </p>
                  <label htmlFor="password" className="hidden">
                    Password
                  </label>
                  <input
                    className={styles.inputForm}
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="passwordReq"
                    onFocus={() => {
                      setPasswordFocus(true);
                    }}
                    onBlur={() => {
                      setPasswordFocus(false);
                    }}
                    placeholder="Password"
                  />
                  <div className="w-[415px]">
                    <p
                      id="passwordReq"
                      className={
                        password && passwordFocus && !validPassword
                          ? "block"
                          : "absolute left-[-9999px]"
                      }
                    >
                      Passwrord must contain at least one capital and one
                      lowercase letters <br />
                      Password must contain at least one digit and special
                      symbol (!, @, #, $, % )<br />
                      Length of password must be between 8 and 24 symbols
                      <br />
                    </p>
                  </div>
                  <label htmlFor="comnfirmPassword" className="hidden">
                    Confirm password
                  </label>
                  <input
                    className={styles.inputForm}
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    value={confirmPassword}
                    required
                    aria-invalid={validConfirmPassword ? "false" : "true"}
                    aria-describedby="confirmPasswordReq"
                    onFocus={() => {
                      setConfirmPasswordFocus(true);
                    }}
                    onBlur={() => {
                      setConfirmPasswordFocus(false);
                    }}
                    placeholder="Confirm password"
                  />
                  <p
                    id="confirmPasswordReq"
                    className={
                      confirmPassword &&
                      confirmPasswordFocus &&
                      !validConfirmPassword
                        ? "block"
                        : "absolute left-[-9999px]"
                    }
                  >
                    Password and confirm password must match
                  </p>
                  <button
                    className={styles.signUpButton}
                    disabled={
                      !validName ||
                      !validEmail ||
                      !validPassword ||
                      !validConfirmPassword
                    }
                  >
                    Continue
                  </button>
                </form>
                <div className="w-[415px] text-[13px] text-[#7B7B7B] mt-[46px] text-center">
                  By signing up, you are creating a Honk account and agree to
                  Honk’s Terms and Privacy Policy
                </div>
                <div className="mt-8 text-[14px] text-[#7B7B7B] text-center">
                  Already have an account?{" "}
                  <span className="text-m text-[#E0876A]">Sign in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
