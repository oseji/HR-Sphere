import { BarChart, Bar, Rectangle, XAxis, Tooltip } from "recharts";

import userIcon from "./assets/stats user icon.svg";
import jobIcon from "./assets/stats resignation icon.svg";
import folderIcon from "./assets/stats folder icon.svg";
import upGrowth from "./assets/up growth.svg";
import downGrowth from "./assets/down growth.svg";
import searchIcon from "./assets/circum_search.png";

import avatarImg from "./assets/avatarImg.png";

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

  type employeeOverviewType = {
    name: string;
    jobTitle: string;
    department: string;
    email: string;
    status: string;
  };
  const employeeOverview: { [key: string]: employeeOverviewType } = {
    willJohn: {
      name: "will john",
      jobTitle: "product designer",
      department: "product",
      email: "willjohn@gmail.com",
      status: "on site",
    },
    jessicaReel: {
      name: "jessica reel",
      jobTitle: "product manager",
      department: "product",
      email: "jessicaforeel@gmail.com",
      status: "remote",
    },
    ronaldRichard: {
      name: "ronald richard",
      jobTitle: "front-end engineer",
      department: "engineering",
      email: "ronrich@yahoo.com",
      status: "remote",
    },
    estherHoward: {
      name: "esther howard",
      jobTitle: "back-end engineer",
      department: "engineering",
      email: "estward@gmail.com",
      status: "remote",
    },
    arleneMccoy: {
      name: "arlene mccoy",
      jobTitle: "product designer",
      department: "product",
      email: "mcarlene@gmail.com",
      status: "on site",
    },
    floydMiles: {
      name: "floyd miles",
      jobTitle: "fullstack engineer",
      department: "engineering",
      email: "floydmi@gmail.com",
      status: "on site",
    },
    janeCooper: {
      name: "jane cooper",
      jobTitle: "product manager",
      department: "product",
      email: "jacoop@outlook.com",
      status: "on site",
    },
    marvinMckinney: {
      name: "marvin mcckinney",
      jobTitle: "product designer",
      department: "product",
      email: "willjohn@gmail.com",
      status: "remote",
    },
    cameronWilliamson: {
      name: "cameron williamson",
      jobTitle: "HR",
      department: "HR",
      email: "cameronwilliamson@gmail.com",
      status: "on site",
    },
    devonLane: {
      name: "devon lane",
      jobTitle: "devOps engineer",
      department: "devOps",
      email: "devonLane@yahoo.com",
      status: "remote",
    },
  };

  return (
    <section className="flex flex-col gap-3 p-3">
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
            height={190}
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

          <div className="barChartInfo">
            <div className="flex flex-row items-center gap-2">
              <span className="p-2 rounded bg-[#095256]"></span>
              <div className="text-sm">Retention Rate</div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="p-2 rounded bg-[#06D6A0]"></span>
              <div className="text-sm">Turnover Rate</div>
            </div>
          </div>
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

      <div className="tableGrp">
        <div className="tableGrpHeader">
          <h1 className="text-black font-semibold">Employees</h1>

          <div className="tableSearchGrp">
            <img src={searchIcon} alt="search icon" className="h-5" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-0 text-sm placeholder:text-sm"
            />
          </div>
        </div>

        <div className="tableFilterGrp">
          <select className="tableFilter">
            <option value="All employees">All employees</option>
            <option value="All employees">All employees</option>
          </select>

          <select className="tableFilter">
            <option value="All job titles">All job titles</option>
            <option value="All job titles">All job titles</option>
          </select>

          <select className="tableFilter">
            <option value="All departments">All departments</option>
            <option value="All departments">All departments</option>
          </select>
        </div>

        <table className="text-xs">
          <thead>
            <tr>
              <th>employee</th>
              <th>job title</th>
              <th>department</th>
              <th>email</th>
              <th>status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="employeeName">
                <img src={avatarImg} alt="profile image" />
                <p> {employeeOverview.willJohn.name}</p>
              </td>
              <td>{employeeOverview.willJohn.jobTitle}</td>
              <td>{employeeOverview.willJohn.department}</td>
              <td>{employeeOverview.willJohn.email}</td>
              <td>{employeeOverview.willJohn.status}</td>
            </tr>

            <tr>
              <td className="employeeName">
                <img src={avatarImg} alt="profile image" />
                <p> {employeeOverview.jessicaReel.name}</p>
              </td>
              <td>{employeeOverview.jessicaReel.jobTitle}</td>
              <td>{employeeOverview.jessicaReel.department}</td>
              <td>{employeeOverview.jessicaReel.email}</td>
              <td>{employeeOverview.jessicaReel.status}</td>
            </tr>

            <tr>
              <td className="employeeName">
                <img src={avatarImg} alt="profile image" />
                <p> {employeeOverview.ronaldRichard.name}</p>
              </td>
              <td>{employeeOverview.ronaldRichard.jobTitle}</td>
              <td>{employeeOverview.ronaldRichard.department}</td>
              <td>{employeeOverview.ronaldRichard.email}</td>
              <td>{employeeOverview.ronaldRichard.status}</td>
            </tr>

            <tr>
              <td className="employeeName">
                <img src={avatarImg} alt="profile image" />
                <p> {employeeOverview.estherHoward.name}</p>
              </td>
              <td>{employeeOverview.estherHoward.jobTitle}</td>
              <td>{employeeOverview.estherHoward.department}</td>
              <td>{employeeOverview.estherHoward.email}</td>
              <td>{employeeOverview.estherHoward.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Stats;
