import { useState, useRef, ForwardedRef } from "react";
import { Spinner } from "@chakra-ui/react";

import closedEye from "../assets/closedEye.svg";
import openedEye from "../assets/openedEye.svg";

type loginLoading = boolean;
type setIsLoginLoading = (loading: boolean) => void;
type userEmail = string;
type userPassword = string;
type loginEmail = string;
type loginPassword = string;

type setUserEmail = (text: string) => void;
type setUserPassword = (text: string) => void;
type setLoginPassword = (text: string) => void;
type setLoginEmail = (text: string) => void;

type confirmPassword = string;
type setConfirmPassword = (text: string) => void;

type createAccount = () => Promise<void>;
type signIn = () => Promise<void>;

type errorMessage = string;
type setErrorMessage = (text: string) => void;
type errorMessageRef = ForwardedRef<HTMLParagraphElement>[];

type loginPageProps = {
  loginLoading: loginLoading;
  setIsLoginLoading: setIsLoginLoading;
  userEmail: userEmail;
  userPassword: userPassword;
  setUserEmail: setUserEmail;
  setUserPassword: setUserPassword;
  loginEmail: loginEmail;
  loginPassword: loginPassword;
  setLoginEmail: setLoginEmail;
  setLoginPassword: setLoginPassword;
  confirmPassword: confirmPassword;
  setConfirmPassword: setConfirmPassword;

  createAccount: createAccount;
  signIn: signIn;

  errorMessage: errorMessage;
  setErrorMessage: setErrorMessage;
  errorMessageRef: errorMessageRef;
};

const LoginPage = (props: loginPageProps) => {
  const passwordRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

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
      {loginHereClicked && (
        <form className="loginForm">
          <h1 className="loginFormHeading">CREATE AN ACCOUNT</h1>

          <div className="loginFieldGrp">
            <label htmlFor="registerEmail">Email</label>
            <input
              id="registerEmail"
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
            <label htmlFor="registerPassword">Password</label>
            <div className="passwordBox">
              <input
                id="registerPassword"
                className="loginInput"
                type="password"
                placeholder="Password"
                value={props.userPassword}
                ref={passwordRef[0]}
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
                    passwordRef[0].current?.getAttribute("type") === "password"
                      ? "text"
                      : "password";

                  passwordRef[0].current?.setAttribute("type", passwordType);
                }}
              />
            </div>
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="registerPassword">Confirm Password</label>
            <div className="passwordBox">
              <input
                id="registerPassword"
                className="loginInput"
                type="password"
                placeholder="Re-enter Password"
                value={props.confirmPassword}
                ref={passwordRef[1]}
                onChange={(e) => {
                  props.setConfirmPassword(e.target.value);
                }}
                required
              />

              {/* <img
                className="h-6 cursor-pointer"
                src={!passwordVisible ? closedEye : openedEye}
                alt="eye icon"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                  const passwordType =
                    passwordRef[1].current?.getAttribute("type") === "password"
                      ? "text"
                      : "password";

                  passwordRef[1].current?.setAttribute("type", passwordType);
                }}
              /> */}
            </div>
          </div>

          <p className="errorMessage hidden" ref={props.errorMessageRef[0]}>
            {props.errorMessage}
          </p>

          <div className=" flex flex-row gap-14 justify-between items-center">
            <button
              className="loginBtn"
              onClick={(e) => {
                e.preventDefault();
                props.createAccount();
              }}
            >
              {props.loginLoading
                ? "Creating account"
                : "Create account and Sign in"}
            </button>

            {props.loginLoading && <Spinner className=" mt-2"></Spinner>}
          </div>

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
      {!loginHereClicked && (
        <form className="loginForm">
          <h1 className="loginFormHeading">LOGIN</h1>

          <div className="loginFieldGrp">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
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
            <label htmlFor="loginPassword">Password</label>
            <div className="passwordBox">
              <input
                id="loginPassword"
                className="loginInput"
                type="password"
                placeholder="Password"
                value={props.loginPassword}
                ref={passwordRef[0]}
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
                    passwordRef[0].current?.getAttribute("type") === "password"
                      ? "text"
                      : "password";

                  passwordRef[0].current?.setAttribute("type", passwordType);
                }}
              />
            </div>
          </div>

          <p className="errorMessage hidden" ref={props.errorMessageRef[1]}>
            {props.errorMessage}
          </p>

          <div className=" flex flex-row gap-14 justify-between items-center">
            <button
              className="loginBtn"
              onClick={(e) => {
                e.preventDefault();
                props.signIn();
              }}
            >
              {props.loginLoading ? "Signing In" : "Sign In"}
            </button>

            {props.loginLoading && <Spinner className=" mt-2"></Spinner>}
          </div>

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
