import { BarChart, Bar, Rectangle, XAxis, Tooltip, Legend } from "recharts";

import userIcon from "./assets/stats user icon.svg";
import jobIcon from "./assets/stats resignation icon.svg";
import folderIcon from "./assets/stats folder icon.svg";
import upGrowth from "./assets/up growth.svg";
import downGrowth from "./assets/down growth.svg";

const Stats = () => {
  type chartDataType = {
    name: string;
    RetentionRate: number;
    TurnoverRate: number;
  };

  const chartData: chartDataType[] = [
    {
      name: "2020",
      RetentionRate: 75,
      TurnoverRate: 20,
    },
    {
      name: "2021",
      RetentionRate: 45,
      TurnoverRate: 55,
    },
    {
      name: "2022",
      RetentionRate: 35,
      TurnoverRate: 65,
    },
    {
      name: "2023",
      RetentionRate: 40,
      TurnoverRate: 60,
    },
    {
      name: "2024",
      RetentionRate: 20,
      TurnoverRate: 80,
    },
  ];

  return (
    <section className="flex flex-col gap-5 bg-slate-300 p-5">
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
        <div className="chartBox">
          <div className="chartHeadingGrp">
            <h1 className="font-semibold text-black">
              Retention & Turnover Rate
            </h1>

            <select id="chartSelection">
              <option value="">Last 5 years</option>
              <option value="">Last 4 years</option>
              <option value="">Last 3 years</option>
              <option value="">Last 2 years</option>
              <option value="">Last 1 year</option>
            </select>
          </div>

          <BarChart
            width={432}
            height={230}
            data={chartData}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" className="font-bold text-black" />

            <Tooltip />
            <Legend />

            <Bar
              dataKey="RetentionRate"
              fill="#095256"
              activeBar={<Rectangle fill="#074144" stroke="white" />}
            />
            <Bar
              dataKey="TurnoverRate"
              fill="#06D6A0"
              activeBar={<Rectangle fill="#05B587" stroke="white" />}
            />
          </BarChart>
        </div>

        <div className="requestBox">
          <h1 className="font-semibold pb-3 border-b border-black text-black w-full">
            Requests
          </h1>

          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">sick leave</p>
            <p className="requestNum">2</p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">maternity leave</p>
            <p className="requestNum">4</p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">annual leave</p>
            <p className="requestNum">2</p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
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
