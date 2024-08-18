import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { LineChart, Line, XAxis, YAxis } from "recharts";

import { data, efficiencyData, keyIndicator } from "../types";

import { useState, useRef, ChangeEvent } from "react";

import eomImg from "../assets/employee of the month.png";
import upArrow from "../assets/up growth.svg";
import avatar from "../assets/arlene.png";

import { dataType } from "./App";
type performanceProps = {
  dbData: dataType;
};

const Performance = (props: performanceProps) => {
  const COLORS = ["#06D6A0", "#095256"];
  const efficiencyCOLORS = ["#06D6A0", "#EBEBEB"];

  const [departmentFilter, setDepartmentFilter] = useState<string>();

  const employeeSortBtnRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  // handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let numberOfPages = Math.ceil(
    Object.values(props.dbData).filter(
      (e) =>
        !departmentFilter || e.department.toLowerCase() === departmentFilter
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
          !departmentFilter || e.department.toLowerCase() === departmentFilter
      ).length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const listOfDepartments = [
    ...new Set(props.dbData.map((item) => item.department.toLowerCase())),
  ];

  return (
    <section className="performanceSection screenSection">
      <div className="flex flex-col gap-3 w-full xl:w-auto">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="totalEmployeeChart  min-w-[227px]">
            <div className="flex flex-row justify-between items-center boxHeading">
              <h2>Total Employee</h2>
              <h2>400</h2>
            </div>

            <PieChart width={200} height={200} className="mx-auto">
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={7}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <div className="barChartInfo text-[10px] mt-5">
              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded bg-buttonGreen"></span>
                <div>Contract staff</div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#06D6A0]"></span>
                <div>Full time staff</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-scroll lg:overflow-x-hidden">
            <div className="keyIndicatorsChart">
              <div className="flex flex-row items-center justify-between text-black mb-5">
                <h2 className="boxHeading">Key Performance Indicators</h2>

                <select className="capitalize">
                  <option value="all departments">all departments</option>
                  <option value="product">product</option>
                  <option value="engineering">engineering</option>
                </select>
              </div>

              <ResponsiveContainer height={200} width="100%">
                <LineChart data={keyIndicator} margin={{ right: 25, top: 10 }}>
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis dataKey="val1" className="text-xs" />
                  <Line
                    type="monotone"
                    dataKey="val1"
                    stroke="#A5A5F9"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="val2" stroke="#FFED4B" />
                  <Line type="monotone" dataKey="val3" stroke="#990EE1" />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex flex-row items-center justify-center gap-5">
                <div className="labelContainer">
                  <div className="colorBox bg-[#A5A5F9]"></div>
                  <p className="labelText">Monthly Active Users (MAUs)</p>
                </div>
                <div className="labelContainer">
                  <div className="colorBox bg-[#FFED4B]"></div>
                  <p className="labelText">Customer Satisfaction</p>
                </div>
                <div className="labelContainer">
                  <div className="colorBox bg-[#990EE1]"></div>
                  <p className="labelText">Churn Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[371px] overflow-x-scroll lg:overflow-x-hidden">
          <div className="employeePerformanceTable">
            <div className="flex flex-row items-center justify-between mb-5">
              <h2 className="boxHeading">Performance Overview</h2>

              <div className="flex flex-row items-center gap-3">
                <select>
                  <option value="qtr1 2024">quater 1 2024</option>
                  <option value="qtr2 2024">quater 2 2024</option>
                  <option value="qtr3 2024">quater 3 2024</option>
                  <option value="qtr4 2024">quater 4 2024</option>
                </select>

                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setDepartmentFilter(e.currentTarget.value);
                  }}
                >
                  <option value="">all departments</option>

                  {listOfDepartments.map((element) => (
                    <option key={element} value={element.toLowerCase()}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <table className="text-xs w-full">
              <thead>
                <tr>
                  <th>employee</th>
                  <th>job title</th>
                  <th>number of KPIs</th>
                  <th>KPI score</th>
                  <th>AVG/month</th>
                </tr>
              </thead>

              <tbody>
                {Object.values(props.dbData)
                  .filter(
                    (e) =>
                      !departmentFilter ||
                      e.department.toLowerCase() === departmentFilter
                  )
                  .slice(startIndex, endIndex)
                  .map((value, index) => (
                    <tr key={index}>
                      <td className="employeeName">
                        <img src={avatar} alt="profile image" />
                        <p> {value.employeeName}</p>
                      </td>
                      <td>{value.role}</td>
                      <td>{value.numberOfKPIs}</td>
                      <td>{value.numberOfKPIs}</td>
                      <td
                      // FIX THIS WHEN YOU HAVE IMPLEMENTED KPI OBJECT
                      // className={
                      //   value.monthlyAvg < 39
                      //     ? "text-[#D00000]"
                      //     : value.monthlyAvg >= 39 && value.monthlyAvg < 60
                      //     ? "text-[#F48B02]"
                      //     : value.monthlyAvg >= 60 && value.monthlyAvg < 70
                      //     ? "text-[#02AB02]"
                      //     : value.monthlyAvg >= 70
                      //     ? "text-[#02AB02]"
                      //     : ""
                      // }
                      >
                        {/* {value.monthlyAvg}% */}
                        avg
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="employeeSort pb-3">
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
                    !departmentFilter ||
                    e.department.toLowerCase() === departmentFilter
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
      </div>

      <div className="flex flex-col gap-3">
        <div className="teamEfficiencyGrp ">
          <h2 className="boxHeading">Team Efficiency</h2>

          <PieChart width={260} height={150} className="mx-auto">
            <Pie
              data={efficiencyData}
              cx={130}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={efficiencyCOLORS[index % efficiencyCOLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <div className="text-center relative bottom-16">
            <p className="text-black dark:text-white font-semibold text-xl">
              80%
            </p>

            <div className="flex flex-row justify-center gap-1 text-xs">
              <img src={upArrow} alt="growth icon" />
              <p>+9.0% increase</p>
            </div>
          </div>

          <div className="efficiencyTextGrp">
            <h2 className="boxHeading">Great Job!</h2>

            <p className="text-xs mb-2">
              There has been 9.0% increase in your team’s efficiency versus the
              previous month and the next training is slated for 22nd march
              2024.
            </p>

            <button className="rounded text-white bg-[#095256] dark:bg-[#A9F2F6] dark:text-black px-3 py-1.5 w-fit text-sm">
              Compare scores
            </button>
          </div>
        </div>

        <div className="employeeOfTheMonth">
          <h2 className="boxHeading">employee of the month</h2>

          <div className="text-center">
            <img
              className="mx-auto mt-6 "
              src={eomImg}
              alt="employee of the month"
            />

            <h4 className="text-sm font-semibold text-black dark:text-white mt-3">
              Ronald Richards
            </h4>
            <p className="text-xs">Product Designer</p>
          </div>

          <div className="eomPerformanceGrp">
            <div>
              <h3 className="eomHeading">performance</h3>

              <p className="eomNum">78%</p>

              <p className="eomSmallText">average of 40%</p>
            </div>

            <div>
              <h3 className="eomHeading">attendance</h3>

              <p className="eomNum">99%</p>

              <p className="eomSmallText">average of 75%</p>
            </div>

            <div>
              <h3 className="eomHeading">KPIs</h3>

              <p className="eomNum">14</p>

              <p className="eomSmallText">average of 10</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;
