import { BarChart, Bar, Rectangle, XAxis, Tooltip } from "recharts";
import { ChangeEvent, useState, useEffect, useRef } from "react";

import { chartData } from "../types";

import { dataType } from "./App";

import userIcon from "../assets/stats user icon.svg";
import jobIcon from "../assets/stats resignation icon.svg";
import folderIcon from "../assets/stats folder icon.svg";
// import upGrowth from "../assets/up growth.svg";
// import downGrowth from "../assets/down growth.svg";
import searchIcon from "../assets/circum_search.png";
import avatar from "../assets/arlene.png";

type statsProps = {
  dbData: dataType;
};

const Stats = (props: statsProps) => {
  const employeeSortBtnRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const [chartYears, setChartYears] = useState<number>(5);
  const [currentChartData, setCurrentChartData] = useState(chartData);

  const [searchFilter, setSearchFilter] = useState<string>();
  const [departmentFilter, setDepartmentFilter] = useState<string>();
  const [jobTitleFilter, setJobTitleFilter] = useState<string>();
  const [workTypeFilter, setWorkTypeFilter] = useState<string>();

  const listOfDepartments = [
    ...new Set(props.dbData.map((item) => item.department.toLowerCase())),
  ];
  const listOfWorkmodes = [
    ...new Set(props.dbData.map((item) => item.workMode.toLowerCase())),
  ];
  const listOfRoles = [
    ...new Set(props.dbData.map((item) => item.role.toLowerCase())),
  ];

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let numberOfPages = Math.ceil(
    Object.values(props.dbData).filter(
      (e) =>
        (!departmentFilter ||
          e.department.toLowerCase() === departmentFilter) &&
        (!workTypeFilter || e.workMode.toLowerCase() === workTypeFilter) &&
        (!jobTitleFilter || e.role.toLowerCase() === jobTitleFilter)
    ).length / itemsPerPage
  );

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (
      endIndex <
      Object.values(props.dbData).filter(
        (e) =>
          (!departmentFilter ||
            e.department.toLowerCase() === departmentFilter) &&
          (!workTypeFilter || e.workMode.toLowerCase() === workTypeFilter) &&
          (!jobTitleFilter || e.role.toLowerCase() === jobTitleFilter)
      ).length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  //update barchart
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
    <section className="flex flex-col gap-3 p-3 w-full lg:max-w-[730px]">
      <div className="statsCardGrp">
        <div className="statsCard">
          <p className="statsHeading">Employees</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">{props.dbData.length}</p>
            <img
              src={userIcon}
              alt="user icon"
              className="p-2 bg-green-100 dark:bg-[#011B1D] rounded-lg"
            />
          </div>

          {/* <div className="bottomStatsCard">
            <img src={upGrowth} alt="" />
            <p className="bottomText">+2.4% vs previous month</p>
          </div> */}
        </div>

        <div className="statsCard">
          <p className="statsHeading">Resignations</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">0</p>
            <img
              src={jobIcon}
              alt="user icon"
              className="p-2 bg-green-100 dark:bg-[#011B1D] rounded-lg"
            />
          </div>

          {/* <div className="bottomStatsCard">
            <img src={downGrowth} alt="" />
            <p className="bottomText">-5.4% vs previous month</p>
          </div> */}
        </div>

        <div className="statsCard">
          <p className="statsHeading">New Applicants</p>

          <div className="statsCardNumGrp">
            <p className="statsNum">0</p>
            <img
              src={folderIcon}
              alt="user icon"
              className="p-2 bg-green-100 dark:bg-[#011B1D] rounded-lg"
            />
          </div>

          {/* <div className="bottomStatsCard">
            <img src={upGrowth} alt="" />
            <p className="bottomText">+6.7% vs previous month</p>
          </div> */}
        </div>
      </div>

      <div className="chartGrp">
        <div className="overflow-x-scroll lg:overflow-x-hidden lg:min-w-fit bg-white dark:bg-[#0F0F0F] rounded-md">
          <div className="chartBox">
            <div className="chartHeadingGrp">
              <h1 className="boxHeading">Retention & Turnover Rate</h1>

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
                <span className="h-3 w-3 rounded bg-buttonGreen"></span>
                <div className="text-[10px]">Retention Rate</div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#06D6A0]"></span>
                <div className="text-[10px]">Turnover Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="requestBox">
          <h1 className="boxHeading pb-3 border-b border-black  w-full">
            Requests
          </h1>

          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">sick leave</p>
            <p className="requestNum">
              {props.dbData.filter((items) => items.requests.sickLeave).length}
            </p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">maternity leave</p>
            <p className="requestNum">
              {
                props.dbData.filter((items) => items.requests.maternityLeave)
                  .length
              }
            </p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">annual leave</p>
            <p className="requestNum">
              {
                props.dbData.filter((items) => items.requests.annualLeave)
                  .length
              }
            </p>
          </div>
          <div className="requestTextGrp border-b border-slate-300">
            <p className="requestText">resume update</p>
            <p className="requestNum">
              {
                props.dbData.filter((items) => items.requests.resumeUpdate)
                  .length
              }
            </p>
          </div>
          <div className="requestTextGrp">
            <p className="requestText">profile update</p>
            <p className="requestNum">
              {
                props.dbData.filter((items) => items.requests.profileUpdate)
                  .length
              }
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-scroll lg:overflow-x-hidden">
        <div className="tableGrp">
          <div className="tableGrpHeader">
            <h1 className="boxHeading">Employees</h1>

            <div className="tableSearchGrp">
              <img src={searchIcon} alt="search icon" className="h-5" />
              <input
                type="text"
                placeholder="Search for employee"
                className="text-xs placeholder:text-xs"
                value={searchFilter}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearchFilter(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div className="tableFilterGrp">
            {/* work type */}
            <select
              className="tableFilter"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setWorkTypeFilter(e.currentTarget.value.toLowerCase())
              }
            >
              <option value="">All employees</option>

              {listOfWorkmodes.map((element) => (
                <option key={element} value={element.toLowerCase()}>
                  {element}
                </option>
              ))}
            </select>

            {/* job titles */}
            <select
              className="tableFilter"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setJobTitleFilter(e.currentTarget.value.toLowerCase())
              }
            >
              <option value="">All job titles</option>

              {listOfRoles.map((element) => (
                <option key={element} value={element.toLowerCase()}>
                  {element}
                </option>
              ))}
            </select>

            {/* departments */}
            <select
              className="tableFilter"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setDepartmentFilter(e.currentTarget.value.toLowerCase())
              }
            >
              <option value="">All departments</option>

              {listOfDepartments.map((element) => (
                <option key={element} value={element.toLowerCase()}>
                  {element}
                </option>
              ))}
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
              {Object.values(props.dbData)
                .filter(
                  (e) =>
                    (!departmentFilter ||
                      e.department.toLowerCase() === departmentFilter) &&
                    (!workTypeFilter ||
                      e.workMode.toLowerCase() === workTypeFilter) &&
                    (!jobTitleFilter ||
                      e.role.toLowerCase() === jobTitleFilter) &&
                    (!searchFilter ||
                      e.employeeName
                        .toLowerCase()
                        .includes(searchFilter.toLowerCase()))
                )
                .slice(startIndex, endIndex)
                .map((value, index) => (
                  <tr key={index}>
                    <td className="employeeName">
                      <img src={avatar} alt="profile image" />
                      <p> {value.employeeName}</p>
                    </td>
                    <td>{value.role}</td>
                    <td>{value.department}</td>
                    <td>{value.employeeEmail}</td>
                    <td
                      className={`${
                        value.workMode.toLowerCase() === "remote"
                          ? "text-[#047E04]"
                          : value.workMode.toLowerCase() === "on site"
                          ? "text-[#EF5F04]"
                          : "text-yellow-400"
                      }`}
                    >
                      {value.workMode}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="employeeSort">
        <div className="flex flex-row items-center gap-5">
          <button
            className={`employeeSortBtn activeSortBtn ${
              currentPage === 1 ? "hidden" : ""
            }`}
            onClick={handlePrevBtn}
            ref={employeeSortBtnRefs[0]}
            value={0}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            className={`employeeSortBtn ${
              endIndex >=
              Object.values(props.dbData).filter(
                (e) =>
                  (!departmentFilter ||
                    e.department.toLowerCase() === departmentFilter) &&
                  (!workTypeFilter ||
                    e.workMode.toLowerCase() === workTypeFilter) &&
                  (!jobTitleFilter || e.role.toLowerCase() === jobTitleFilter)
              ).length
                ? "hidden"
                : ""
            }`}
            onClick={handleNextBtn}
            ref={employeeSortBtnRefs[1]}
            value={1}
          >
            Next
          </button>
        </div>

        <div className="pageNumGrp">
          {Array.from({ length: numberOfPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pageNum ${
                currentPage === index + 1 ? "activePageNum" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
