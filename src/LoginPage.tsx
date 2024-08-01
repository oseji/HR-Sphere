import { useState } from "react";

const LoginPage = () => {
  const [loginHereClicked, setLoginHereClicked] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  return (
    <div className="loginPage">
      <div className="loginTextContainer">
        <h1 className=" text-3xl md:text-5xl lg:text-6xl font-bold text-center">
          Welcome To HR-Sphere
        </h1>
      </div>

      {/* REGISTRATION FORM */}
      {!loginHereClicked && (
        <form className="loginForm">
          <div className="loginFieldGrp">
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
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="loginInput"
              required
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="loginInput"
              required
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
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
          <div className="loginFieldGrp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="loginInput"
              required
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="loginInput"
              required
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
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
