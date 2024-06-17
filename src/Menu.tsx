import { SyntheticEvent, useRef } from "react";
import { Link } from "react-router-dom";

import iconHome from "./assets/octicon_home-24.svg";
import iconUsers from "./assets/mynaui_users-group.svg";
import iconPerformance from "./assets/fluent_arrow-growth-24-regular.svg";
import iconPayroll from "./assets/healthicons_money-bag-outline.svg";
import iconFolder from "./assets/fluent_document-folder-20-regular.svg";
import iconHelp from "./assets/formkit_help.svg";
import iconSettings from "./assets/fluent_settings-20-regular.svg";
import iconLogout from "./assets/iconoir_log-out.svg";

type menuProp = {
  menu: any;
};

const Menu = (props: menuProp) => {
  const menuRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const toggleMenuClass = (e: SyntheticEvent) => {
    const clicked = Number(e.currentTarget.getAttribute("data-value"));

    menuRefs.forEach((element, index) => {
      const menu = element.current;

      if (index === clicked) {
        menu?.classList.add("activeMenuGrp");
      } else {
        menu?.classList.remove("activeMenuGrp");
      }
    });
  };

  return (
    <section className="menuScreen menuClosed" ref={props.menu}>
      <div className="menuCollection">
        <Link to={"/"}>
          <div
            className="menuGrp activeMenuGrp"
            ref={menuRefs[0]}
            data-value="0"
            onClick={toggleMenuClass}
          >
            <img src={iconHome} alt="home icon" />
            <p className="menutext">Home</p>
          </div>
        </Link>

        <Link to={"/Profiles"}>
          <div
            className="menuGrp"
            ref={menuRefs[1]}
            data-value="1"
            onClick={toggleMenuClass}
          >
            <img src={iconUsers} alt="profile icon" />
            <p className="menutext">Profiles</p>
          </div>
        </Link>

        <Link to={"/Performance"}>
          <div
            className="menuGrp"
            ref={menuRefs[2]}
            data-value="2"
            onClick={toggleMenuClass}
          >
            <img src={iconPerformance} alt="performance icon" />
            <p className="menutext">Performance</p>
          </div>
        </Link>

        <Link to={"/Payroll"}>
          <div
            className="menuGrp"
            ref={menuRefs[3]}
            data-value="3"
            onClick={toggleMenuClass}
          >
            <img src={iconPayroll} alt="payroll icon" />
            <p className="menutext">Payroll</p>
          </div>
        </Link>

        <Link to={"/FileManager"}>
          <div
            className="menuGrp"
            ref={menuRefs[4]}
            data-value="4"
            onClick={toggleMenuClass}
          >
            <img src={iconFolder} alt="folder icon" />
            <p className="menutext">File Manager</p>
          </div>
        </Link>
      </div>

      <div className="menuCollection">
        <Link to={"/HelpSupport"}>
          <div
            className="menuGrp"
            ref={menuRefs[5]}
            data-value="5"
            onClick={toggleMenuClass}
          >
            <img src={iconHelp} alt="help icon" />
            <p className="menutext">Help/support</p>
          </div>
        </Link>

        <Link to={"/Settings"}>
          <div
            className="menuGrp"
            ref={menuRefs[6]}
            data-value="6"
            onClick={toggleMenuClass}
          >
            <img src={iconSettings} alt="settings icon" />
            <p className="menutext">Setting</p>
          </div>
        </Link>

        <Link to={"/Logout"}>
          <div
            className="menuGrp"
            ref={menuRefs[7]}
            data-value="7"
            onClick={toggleMenuClass}
          >
            <img src={iconLogout} alt="log out icon" />
            <p className="menutext">Log out</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Menu;
