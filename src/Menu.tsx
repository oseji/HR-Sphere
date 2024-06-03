import iconHome from "./assets/octicon_home-24.svg";
import iconUsers from "./assets/mynaui_users-group.svg";
import iconPerformance from "./assets/fluent_arrow-growth-24-regular.svg";
import iconPayroll from "./assets/healthicons_money-bag-outline.svg";
import iconFolder from "./assets/fluent_document-folder-20-regular.svg";
import iconHelp from "./assets/formkit_help.svg";
import iconSettings from "./assets/fluent_settings-20-regular.svg";
import iconLogout from "./assets/iconoir_log-out.svg";

const Menu = () => {
  return (
    <section className=" flex flex-col justify-between">
      <div className="menuCollection">
        <div className="menuGrp">
          <img src={iconHome} alt="home icon" />
          <p>Dashboard</p>
        </div>
        <div className="menuGrp">
          <img src={iconUsers} alt="profile icon" />
          <p>Profiles</p>
        </div>
        <div className="menuGrp">
          <img src={iconPerformance} alt="performance icon" />
          <p>Performance</p>
        </div>
        <div className="menuGrp">
          <img src={iconPayroll} alt="payroll icon" />
          <p>Payroll</p>
        </div>
        <div className="menuGrp">
          <img src={iconFolder} alt="folder icon" />
          <p>File Manager</p>
        </div>
      </div>

      <div className="menuCollection">
        <div className="menuGrp">
          <img src={iconHelp} alt="help icon" />
          <p>Help/support</p>
        </div>
        <div className="menuGrp">
          <img src={iconSettings} alt="settings icon" />
          <p>Setting</p>
        </div>
        <div className="menuGrp">
          <img src={iconLogout} alt="log out icon" />
          <p>Log out</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
