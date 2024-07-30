import { Route, Switch } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import LoginPage from "./LoginPage";
import Menu from "./Menu";
import Overview from "./Overview";
import Performance from "./Performance";
import Payroll from "./Payroll";
import FileManager from "./FileManager";

import menuIcon from "./assets/menu.svg";
import closeMenu from "./assets/closeMenu.svg";
import logo from "./assets/logo.png";
import searchIcon from "./assets/circum_search.png";
import bellIcon from "./assets/bellIcon.svg";
import avatar from "./assets/esther.png";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => console.log(setIsLoggedIn));

  const openCloseMenu = () => {
    setMenuToggled(!menuToggled);
    const menuBtn = menuRef.current;
    menuBtn?.classList.toggle("menuClosed");
  };

  return (
    <div className="App" ref={appRef}>
      {/* login screen */}
      {!isLoggedIn && <LoginPage></LoginPage>}

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
                <img
                  src={bellIcon}
                  alt="bell icon"
                  className="border border-slate-300 rounded-full py-1.5 px-2.5 w-9 hidden md:block"
                />

                <div className="profileGrp">
                  <img src={avatar} alt="profile image" className="w-8" />
                  <div className="profileName">stephanie ukwade</div>
                </div>
              </div>
            </div>
          </header>

          <main className="lg:flex flex-row lg:max-h-screen max-w-[100dvw] relative">
            <Menu menu={menuRef} app={appRef}></Menu>

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
