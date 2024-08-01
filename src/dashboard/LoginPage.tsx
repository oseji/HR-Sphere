import { useState, useRef, ForwardedRef } from "react";

import closedEye from "../assets/closedEye.svg";
import openedEye from "../assets/openedEye.svg";

type userEmail = string;
type userPassword = string;
type loginEmail = string;
type loginPassword = string;

type setUserEmail = (text: string) => void;
type setUserPassword = (text: string) => void;
type setLoginPassword = (text: string) => void;
type setLoginEmail = (text: string) => void;

type createAccount = () => Promise<void>;
type signIn = () => Promise<void>;

type errorMessage = string;
type setErrorMessage = (text: string) => void;
type errorMessageRef = ForwardedRef<HTMLParagraphElement>[];

type loginPageProps = {
  userEmail: userEmail;
  userPassword: userPassword;
  setUserEmail: setUserEmail;
  setUserPassword: setUserPassword;
  loginEmail: loginEmail;
  loginPassword: loginPassword;
  setLoginEmail: setLoginEmail;
  setLoginPassword: setLoginPassword;

  createAccount: createAccount;
  signIn: signIn;

  errorMessage: errorMessage;
  setErrorMessage: setErrorMessage;
  errorMessageRef: errorMessageRef;
};

const LoginPage = (props: loginPageProps) => {
  const passwordRef = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginHereClicked, setLoginHereClicked] = useState<boolean>(false);

  return (
    <div className="loginPage">
      <div className="loginTextContainer">
        <h1 className=" text-3xl md:text-5xl lg:text-6xl font-bold text-center">
          Welcome to HR-Sphere
        </h1>
      </div>

      {/* REGISTRATION FORM */}
      {!loginHereClicked && (
        <form className="loginForm">
          {/* <div className="loginFieldGrp">
            <label htmlFor="email">First Name</label>
            <input
              type="text"
              className="loginInput"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="email">Last Name</label>
            <input
              type="text"
              className="loginInput"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div> */}

          <h1 className="loginFormHeading">CREATE AN ACCOUNT</h1>

          <div className="loginFieldGrp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              value={props.userEmail}
              onChange={(e) => {
                props.setUserEmail(e.target.value);
              }}
            />
          </div>

          <div className="loginFieldGrp">
            <div className="passwordBox">
              <input
                className="loginInput"
                type="password"
                placeholder="Password"
                value={props.userPassword}
                ref={passwordRef}
                onChange={(e) => {
                  props.setUserPassword(e.target.value);
                }}
                required
              />

              <img
                className="h-6 cursor-pointer"
                src={!passwordVisible ? closedEye : openedEye}
                alt="eye icon"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                  const passwordType =
                    passwordRef.current?.getAttribute("type") === "password"
                      ? "text"
                      : "password";

                  passwordRef.current?.setAttribute("type", passwordType);
                }}
              />
            </div>
          </div>

          <p className="errorMessage hidden" ref={props.errorMessageRef[0]}>
            {props.errorMessage}
          </p>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
              props.createAccount();
            }}
          >
            Create account and Sign in
          </button>

          <p className="xl:pl-5">
            Already have an account? Login{" "}
            <span
              className=" underline cursor-pointer"
              onClick={() => {
                setLoginHereClicked(!loginHereClicked);
              }}
            >
              here
            </span>
          </p>
        </form>
      )}

      {/* LOGIN FORM */}
      {loginHereClicked && (
        <form className="loginForm">
          <h1 className="loginFormHeading">LOGIN</h1>

          <div className="loginFieldGrp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              value={props.loginEmail}
              onChange={(e) => {
                props.setLoginEmail(e.target.value);
              }}
            />
          </div>

          <div className="loginFieldGrp">
            <div className="passwordBox">
              <input
                className="loginInput"
                type="password"
                placeholder="Password"
                value={props.loginPassword}
                ref={passwordRef}
                onChange={(e) => {
                  props.setLoginPassword(e.target.value);
                }}
                required
              />

              <img
                className="h-6 cursor-pointer"
                src={!passwordVisible ? closedEye : openedEye}
                alt="eye icon"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                  const passwordType =
                    passwordRef.current?.getAttribute("type") === "password"
                      ? "text"
                      : "password";

                  passwordRef.current?.setAttribute("type", passwordType);
                }}
              />
            </div>
          </div>

          <p className="errorMessage hidden" ref={props.errorMessageRef[1]}>
            {props.errorMessage}
          </p>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
              props.signIn();
            }}
          >
            Sign In
          </button>

          <p className="xl:pl-5">
            Don't have an account? Create one here{" "}
            <span
              className=" underline cursor-pointer"
              onClick={() => {
                setLoginHereClicked(!loginHereClicked);
              }}
            >
              here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
