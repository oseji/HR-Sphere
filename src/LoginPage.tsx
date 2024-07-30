import { useState } from "react";

const LoginPage = () => {
  const [loginHereClicked, setLoginHereClicked] = useState<boolean>(false);

  return (
    <div className="loginPage">
      <div className="loginTextContainer">
        <h1 className=" text-3xl md:text-4xl lg:text-6xl font-bold text-center">
          Welcome to HR-Sphere
        </h1>
      </div>

      {/* REGISTRATION FORM */}
      {!loginHereClicked && (
        <form className="loginForm">
          <div className="loginFieldGrp">
            <label htmlFor="email">First Name</label>
            <input type="text" className="loginInput" />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="email">Last Name</label>
            <input type="text" className="loginInput" />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="email">Email</label>
            <input type="email" className="loginInput" />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="password">Password</label>
            <input type="password" className="loginInput" />
          </div>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Create account and Sign in
          </button>

          <p>
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
            <input type="email" className="loginInput" />
          </div>

          <div className="loginFieldGrp">
            <label htmlFor="password">Password</label>
            <input type="password" className="loginInput" />
          </div>

          <button
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Sign In
          </button>

          <p>
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
