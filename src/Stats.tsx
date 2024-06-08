import { BarChart, Bar, Rectangle, XAxis, Tooltip } from "recharts";
import {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
} from "react";

import userIcon from "./assets/stats user icon.svg";
import jobIcon from "./assets/stats resignation icon.svg";
import folderIcon from "./assets/stats folder icon.svg";
import upGrowth from "./assets/up growth.svg";
import downGrowth from "./assets/down growth.svg";
import searchIcon from "./assets/circum_search.png";

import avatarImg from "./assets/avatarImg.png";
import cameron from "./assets/cameron.png";
import devon from "./assets/devon.png";
import esther from "./assets/esther.png";
import floyd from "./assets/floyd.png";
import jane from "./assets/jane.png";
import marvin from "./assets/marvin.png";
import arlene from "./assets/arlene.png";
import ronald from "./assets/ronald.png";
import jessica from "./assets/jessica.png";
import will from "./assets/will.png";

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

  const [chartYears, setChartYears] = useState<number>(5);
  const [currentChartData, setCurrentChartData] = useState(chartData);

  type employeeOverviewType = {
    name: string;
    img: string;
    jobTitle: string;
    department: string;
    email: string;
    status: string;
    statusColor: string;
  };
  const employeeOverview: { [key: string]: employeeOverviewType } = {
    willJohn: {
      name: "will john",
      img: will,
      jobTitle: "product designer",
      department: "product",
      email: "willjohn@gmail.com",
      status: "on site",
      statusColor: "text-[#047E04]",
    },
    jessicaReel: {
      name: "jessica reel",
      img: jessica,
      jobTitle: "product manager",
      department: "product",
      email: "jessicaforeel@gmail.com",
      status: "remote",
      statusColor: "text-[#EF5F04]",
    },
    ronaldRichard: {
      name: "ronald richard",
      img: ronald,
      jobTitle: "front-end engineer",
      department: "engineering",
      email: "ronrich@yahoo.com",
      status: "remote",
      statusColor: "text-[#EF5F04]",
    },
    estherHoward: {
      name: "esther howard",
      img: esther,
      jobTitle: "back-end engineer",
      department: "engineering",
      email: "estward@gmail.com",
      status: "remote",
      statusColor: "text-[#EF5F04]",
    },
    arleneMccoy: {
      name: "arlene mccoy",
      img: arlene,
      jobTitle: "product designer",
      department: "product",
      email: "mcarlene@gmail.com",
      status: "on site",
      statusColor: "text-[#047E04]",
    },
    floydMiles: {
      name: "floyd miles",
      img: floyd,
      jobTitle: "fullstack engineer",
      department: "engineering",
      email: "floydmi@gmail.com",
      status: "on site",
      statusColor: "text-[#047E04]",
    },
    janeCooper: {
      name: "jane cooper",
      img: jane,
      jobTitle: "product manager",
      department: "product",
      email: "jacoop@outlook.com",
      status: "on site",
      statusColor: "text-[#047E04]",
    },
    marvinMckinney: {
      name: "marvin mcckinney",
      img: marvin,
      jobTitle: "product designer",
      department: "product",
      email: "willjohn@gmail.com",
      status: "remote",
      statusColor: "text-[#EF5F04]",
    },
    cameronWilliamson: {
      name: "cameron williamson",
      img: cameron,
      jobTitle: "HR",
      department: "HR",
      email: "cameronwilliamson@gmail.com",
      status: "on site",
      statusColor: "text-[#047E04]",
    },
    devonLane: {
      name: "devon lane",
      img: devon,
      jobTitle: "devOps engineer",
      department: "devOps",
      email: "devonLane@yahoo.com",
      status: "remote",
      statusColor: "text-[#EF5F04]",
    },
  };

  const [sliceIndexes, setSliceIndexes] = useState({ start: 0, end: 5 });

  const toggleChartData = (e: ChangeEvent<HTMLSelectElement>) => {
    const yearVal = e.target.value;

    setChartYears((prev) => {
      let year = prev;

      if (yearVal === "5") {
        year = 5;
      } else if (yearVal === "4") {
        year = 4;
      } else if (yearVal === "3") {
        year = 3;
      } else if (yearVal === "2") {
        year = 2;
      } else if (yearVal === "1") {
        year = 1;
      }

      return year;
    });
  };

  const employeeSortBtnRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const toggleActivePageClass = (e: SyntheticEvent<HTMLButtonElement>) => {
    const clicked = Number(e.currentTarget.value);

    employeeSortBtnRefs.forEach((element, index) => {
      const btn = element.current;

      if (index === clicked) {
        btn?.classList.add("activeSortBtn");
      } else {
        btn?.classList.remove("activeSortBtn");
      }
    });
  };

  useEffect(() => {
    setCurrentChartData((prev) => {
      let chart = prev;

      if (chartYears === 5) {
        chart = chartData;
      } else if (chartYears === 4) {
        chart = chartData.slice(1, 5);
      } else if (chartYears === 3) {
        chart = chartData.slice(2, 5);
      } else if (chartYears === 3) {
        chart = chartData.slice(3, 5);
      } else if (chartYears === 2) {
        chart = chartData.slice(-2);
      } else if (chartYears === 1) {
        chart = chartData.slice(-1);
      }

      return chart;
    });
  }, [chartYears]);

  return (
    <section className="flex flex-col gap-3 p-3 max-w-[730px]">
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

            <select id="chartSelection" onChange={toggleChartData}>
              <option value="5">Last 5 years</option>
              <option value="4">Last 4 years</option>
              <option value="3">Last 3 years</option>
              <option value="2">Last 2 years</option>
              <option value="1">Last 1 year</option>
            </select>
          </div>

          <BarChart
            width={432}
            height={190}
            data={currentChartData}
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
            <option value="remote">Remote</option>
            <option value="on site">on site employees</option>
          </select>

          <select className="tableFilter">
            <option value="All job titles">All job titles</option>
            <option value="front-end engineer">front-end engineer</option>
            <option value="back-end engineer">back-end engineer</option>
            <option value="product manager">product manager</option>
            <option value="product designer">product designer</option>
          </select>

          <select className="tableFilter">
            <option value="All departments">All departments</option>
            <option value="engineering">engineering</option>
            <option value="product">product</option>
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
            {Object.values(employeeOverview)
              .slice(sliceIndexes.start, sliceIndexes.end)
              .map((value, index) => (
                <tr key={index}>
                  <td className="employeeName">
                    <img src={value.img} alt="profile image" />
                    <p> {value.name}</p>
                  </td>
                  <td>{value.jobTitle}</td>
                  <td>{value.department}</td>
                  <td>{value.email}</td>
                  <td className={value.statusColor}>{value.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="employeeSort">
        <button
          className={`employeeSortBtn activeSortBtn`}
          onClick={(e) => {
            setSliceIndexes({ start: 0, end: 5 });
            toggleActivePageClass(e);
          }}
          ref={employeeSortBtnRefs[0]}
          value={0}
        >
          1
        </button>

        <button
          className={`employeeSortBtn`}
          onClick={(e) => {
            setSliceIndexes({ start: 5, end: 10 });
            toggleActivePageClass(e);
          }}
          ref={employeeSortBtnRefs[1]}
          value={1}
        >
          2
        </button>
      </div>
    </section>
  );
};

export default Stats;
