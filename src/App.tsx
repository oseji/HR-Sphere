import { Route, Switch } from "react-router-dom";

import Menu from "./Menu";
import Overview from "./Overview";
import Performance from "./Performance";
import Payroll from "./Payroll";

import logo from "./assets/logo.png";
import searchIcon from "./assets/circum_search.png";
import bellIcon from "./assets/bellIcon.svg";
import avatar from "./assets/stephanie.jpg";

function App() {
  return (
    <div className="App">
      <header>
        <div className="logoGrp">
          <img src={logo} alt="logo" />
          <h1 className="font-bold text-black">HR Sphere</h1>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <div className="inputGrp">
            <img src={searchIcon} alt="search icon" className="h-5" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-0 text-sm placeholder:text-sm"
            />
          </div>

          <div className="flex flex-row items-center gap-5">
            <img
              src={bellIcon}
              alt="bell icon"
              className="border border-slate-300 rounded-full py-1.5 px-2.5 w-9"
            />

            <div className="profileGrp">
              <img src={avatar} alt="profile image" className="w-8" />
              <div className="profileName">stephanie ukwade</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-row">
        <Menu></Menu>

        <Switch>
          <Route exact path="/" component={Overview} />

          <Route path="/Performance" component={Performance} />

          <Route path="/Payroll" component={Payroll} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
