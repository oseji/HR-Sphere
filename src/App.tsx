import Menu from "./Menu";
import Stats from "./Stats";

import logo from "./assets/logo.png";
import searchIcon from "./assets/circum_search.png";
import bellIcon from "./assets/basil_notification-outline.png";
import avatar from "./assets/avatar.png";

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
              className="bg-transparent outline-0 placeholder:text-sm"
            />
          </div>

          <div className="flex flex-row items-center gap-5">
            <img
              src={bellIcon}
              alt="bell icon"
              className="border border-slate-300 rounded-full p-1.5"
            />

            <div className="profileGrp">
              <img src={avatar} alt="profile image" />
              <div className="profileName">stephanie ukwade</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-row">
        <Menu></Menu>
        <Stats></Stats>
      </main>
    </div>
  );
}

export default App;
