import { Route, Switch } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { db, auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import LoginPage from "./LoginPage";
import Menu from "./Menu";
import Overview from "./Overview";
import Performance from "./Performance";
import Payroll from "./Payroll";
import FileManager from "./FileManager";

import menuIcon from "../assets/menu.svg";
import closeMenu from "../assets/closeMenu.svg";
import logo from "../assets/logo.png";
import searchIcon from "../assets/circum_search.png";
import avatar from "../assets/esther.png";

export type dataType = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any;
  updatedAt: any;
}[];

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorMessageRef = [
    useRef<HTMLParagraphElement>(null),
    useRef<HTMLParagraphElement>(null),
  ];

  const [dbData, setDbData] = useState<dataType>([]);

  const openCloseMenu = () => {
    setMenuToggled(!menuToggled);
    const menuBtn = menuRef.current;
    menuBtn?.classList.toggle("menuClosed");
  };

  const errorMessageCleanUp = (text: string) => {
    return text
      .replace("Firebase: ", "")
      .replace("Error ", "")
      .replace("auth/", "")
      .replace("(", "")
      .replace(")", "")
      .replace(/-/g, " ");
  };

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      setIsLoggedIn(true);
      alert("created account and logged in");
      setUserEmail("");
      setUserPassword("");
      errorMessageRef[0].current?.classList.add("hidden");
    } catch (err: any) {
      //  errorMessageRef.current?.classList.remove("hidden");
      setIsLoggedIn(false);
      setErrorMessage(errorMessageCleanUp(err.message));
      errorMessageRef[0].current?.classList.remove("hidden");
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoggedIn(true);

      //  errorMessageRef.current?.classList.add("hidden");
      setLoginEmail("");
      setLoginPassword("");
      alert("logged in");
      errorMessageRef[1].current?.classList.add("hidden");
    } catch (err: any) {
      console.error(err);

      //  errorMessageRef.current?.classList.remove("hidden");
      setIsLoggedIn(false);
      setErrorMessage(errorMessageCleanUp(err.message));
      errorMessageRef[1].current?.classList.remove("hidden");
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);

      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      console.error(err);
      setIsLoggedIn(true);
    }
  };

  const getEmployeeData = async () => {
    const user = auth.currentUser;

    try {
      if (user) {
        const q = collection(db, `users/${user.email}/userTodos`);

        const data = (await getDocs(q)).docs;
        const filteredData = data.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as dataType;

        setDbData(filteredData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(isLoggedIn);
    console.log(dbData);

    if (isLoggedIn) {
      getEmployeeData();
    }
  }, [isLoggedIn]);
  return (
    <div className="App" ref={appRef}>
      {/* login screen */}
      {!isLoggedIn && (
        <LoginPage
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPassword={userPassword}
          setUserPassword={setUserPassword}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          signIn={signIn}
          createAccount={createAccount}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          errorMessageRef={errorMessageRef}
        ></LoginPage>
      )}

      {/* dashboard interface */}
      {isLoggedIn && (
        <div className="dashboardInterface">
          <header>
            <div className="logoGrp">
              <img src={logo} alt="logo" className="block" />
              <h1 className="font-bold text-black dark:text-white">
                HR Sphere
              </h1>
            </div>

            <div className="w-full flex flex-row items-center justify-between">
              <img
                src={menuToggled ? closeMenu : menuIcon}
                alt="menu icon"
                className="lg:hidden h-8"
                onClick={openCloseMenu}
              />

              <div className="inputGrp">
                <img src={searchIcon} alt="search icon" className="h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-sm placeholder:text-sm "
                />
              </div>

              <div className="flex flex-row items-center gap-5">
                <div className="profileGrp">
                  <img src={avatar} alt="profile image" className="w-8" />
                  <div className="profileName">stephanie ukwade</div>
                </div>
              </div>
            </div>
          </header>

          <main className="lg:flex flex-row lg:max-h-screen max-w-[100dvw] relative">
            <Menu menu={menuRef} app={appRef} logOut={logOut}></Menu>

            <Switch>
              <Route exact path="/" component={Overview} />

              <Route path="/Performance" component={Performance} />

              <Route path="/Payroll" component={Payroll} />

              <Route path="/FileManager" component={FileManager} />
            </Switch>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;