import { SyntheticEvent, useRef, useState, useEffect } from "react";

import iconHome from "./assets/octicon_home-24.svg";
import iconUsers from "./assets/mynaui_users-group.svg";
import iconPerformance from "./assets/fluent_arrow-growth-24-regular.svg";
import iconPayroll from "./assets/healthicons_money-bag-outline.svg";
import iconFolder from "./assets/fluent_document-folder-20-regular.svg";
import iconHelp from "./assets/formkit_help.svg";
import iconSettings from "./assets/fluent_settings-20-regular.svg";
import iconLogout from "./assets/iconoir_log-out.svg";

const Menu = () => {
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

  const [clickedMenu, setClickedMenu] = useState<number>(0);

  const toggleMenuClass = (e: SyntheticEvent) => {
    const clicked = e.currentTarget.getAttribute("data-value");
    let menuNum = clicked;

    setClickedMenu((prev) => {
      let newNum = prev;

      if (menuNum === "1") {
        newNum = 1;
      } else if (menuNum === "2") {
        newNum = 2;
      } else if (menuNum === "3") {
        newNum = 3;
      } else if (menuNum === "4") {
        newNum = 4;
      } else if (menuNum === "5") {
        newNum = 5;
      } else if (menuNum === "6") {
        newNum = 6;
      } else if (menuNum === "7") {
        newNum = 7;
      } else if (menuNum === "8") {
        newNum = 8;
      }

      return newNum;
    });
  };

  useEffect(() => {
    console.log(clickedMenu);

    menuRefs.forEach((element, index) => {
      const target = element.current;

      if (index + 1 === clickedMenu) {
        target?.classList.add("activeMenuGrp");
      } else {
        target?.classList.remove("activeMenuGrp");
      }
    });
  }, [clickedMenu]);

  return (
    <section className=" flex flex-col justify-between py-5 px-3">
      <div className="menuCollection">
        <div
          className="menuGrp activeMenuGrp"
          ref={menuRefs[0]}
          data-value="1"
          onClick={toggleMenuClass}
        >
          <img src={iconHome} alt="home icon" />
          <p>Dashboard</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[1]}
          data-value="2"
          onClick={toggleMenuClass}
        >
          <img src={iconUsers} alt="profile icon" />
          <p>Profiles</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[2]}
          data-value="3"
          onClick={toggleMenuClass}
        >
          <img src={iconPerformance} alt="performance icon" />
          <p>Performance</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[3]}
          data-value="4"
          onClick={toggleMenuClass}
        >
          <img src={iconPayroll} alt="payroll icon" />
          <p>Payroll</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[4]}
          data-value="5"
          onClick={toggleMenuClass}
        >
          <img src={iconFolder} alt="folder icon" />
          <p>File Manager</p>
        </div>
      </div>

      <div className="menuCollection">
        <div
          className="menuGrp"
          ref={menuRefs[5]}
          data-value="6"
          onClick={toggleMenuClass}
        >
          <img src={iconHelp} alt="help icon" />
          <p>Help/support</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[6]}
          data-value="7"
          onClick={toggleMenuClass}
        >
          <img src={iconSettings} alt="settings icon" />
          <p>Setting</p>
        </div>
        <div
          className="menuGrp"
          ref={menuRefs[7]}
          data-value="8"
          onClick={toggleMenuClass}
        >
          <img src={iconLogout} alt="log out icon" />
          <p>Log out</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
