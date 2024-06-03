import userIcon from "./assets/stats user icon.svg";
import jobIcon from "./assets/stats resignation icon.svg";
import folderIcon from "./assets/stats folder icon.svg";
import upGrowth from "./assets/up growth.svg";
import downGrowth from "./assets/down growth.svg";

const Stats = () => {
  return (
    <section className="flex flex-col gap-2 bg-slate-300 p-2">
      <div className="statsCardGrp">
        <div className="statsCard">
          <p className="statsHeading">Employees</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">400</p>
            <img
              src={userIcon}
              alt="user icon"
              className="p-2 bg-green-100 rounded-lg"
            />
          </div>

          <div className="bottomStatsCard">
            <img src={upGrowth} alt="" />
            <p className="bottomText">+2.4% vs previous month</p>
          </div>
        </div>

        <div className="statsCard">
          <p className="statsHeading">Resignations</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">9</p>
            <img
              src={jobIcon}
              alt="user icon"
              className="p-2 bg-green-100 rounded-lg"
            />
          </div>

          <div className="bottomStatsCard">
            <img src={downGrowth} alt="" />
            <p className="bottomText">-5.4% vs previous month</p>
          </div>
        </div>
        <div className="statsCard">
          <p className="statsHeading">New Applicants</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">40</p>
            <img
              src={folderIcon}
              alt="user icon"
              className="p-2 bg-green-100 rounded-lg"
            />
          </div>

          <div className="bottomStatsCard">
            <img src={upGrowth} alt="" />
            <p className="bottomText">+6.7% vs previous month</p>
          </div>
        </div>
      </div>

      <div className="chartGrp">
        <div className="requestBox">
          <h1 className="font-semibold pb-3 border-b border-black w-full">
            Requests
          </h1>

          <div className="requestTextGrp">
            <p className="requestText">sick leave</p>
            <p className="requestNum">2</p>
          </div>
          <div className="requestTextGrp">
            <p className="requestText">maternity leave</p>
            <p className="requestNum">4</p>
          </div>
          <div className="requestTextGrp">
            <p className="requestText">annual leave</p>
            <p className="requestNum">2</p>
          </div>
          <div className="requestTextGrp">
            <p className="requestText">resume update</p>
            <p className="requestNum">1</p>
          </div>
          <div className="requestTextGrp">
            <p className="requestText">profile update</p>
            <p className="requestNum">1</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
