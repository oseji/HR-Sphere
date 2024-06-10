import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// import {
//   Label,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ReferenceArea,
// } from "recharts";

import { data, efficiencyData, employeeOverview } from "./types";
import { useState, useRef, SyntheticEvent } from "react";

import eomImg from "./assets/employee of the month.png";

const Performance = () => {
  const COLORS = ["#06D6A0", "#095256"];
  const efficiencyCOLORS = ["#06D6A0", "#EBEBEB"];

  const [sliceIndexes, setSliceIndexes] = useState({ start: 0, end: 5 });
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

  return (
    <section className="performanceSection screenSection">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
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
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <div className="barChartInfo text-[10px] mt-5">
              <div className="flex flex-row items-center gap-2">
                <span className="p-2 rounded bg-[#095256]"></span>
                <div>Contract staff</div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="p-2 rounded bg-[#06D6A0]"></span>
                <div>Full time staff</div>
              </div>
            </div>
          </div>

          <div className="keyIndicatorsChart w-[466px]">
            <div className="flex flex-row items-center justify-between text-black">
              <h2 className="boxHeading">Key Performance Indicators</h2>

              <select className="capitalize">
                <option value="all departments">all departments</option>
                <option value="product">product</option>
                <option value="engineering">engineering</option>
              </select>
            </div>
          </div>
        </div>

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

              <select>
                <option value="all departments">all departments</option>
                <option value="engineering">engineering</option>
                <option value="product">product</option>
                <option value="hr">HR</option>
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
              {Object.values(employeeOverview)
                .slice(sliceIndexes.start, sliceIndexes.end)
                .map((value, index) => (
                  <tr key={index}>
                    <td className="employeeName">
                      <img src={value.img} alt="profile image" />
                      <p> {value.name}</p>
                    </td>
                    <td>{value.jobTitle}</td>
                    <td>{value.numberOfKPIs}</td>
                    <td>{value.KPIScore}</td>
                    <td
                      className={
                        value.monthlyAvg < 39
                          ? "text-[#D00000]"
                          : value.monthlyAvg >= 39 && value.monthlyAvg < 60
                          ? "text-[#F48B02]"
                          : value.monthlyAvg >= 60 && value.monthlyAvg < 70
                          ? "text-[#02AB02]"
                          : value.monthlyAvg >= 70
                          ? "text-[#02AB02]"
                          : ""
                      }
                    >
                      {value.monthlyAvg}%
                    </td>
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
      </div>

      <div className="flex flex-col gap-3">
        <div className="teamEfficiencyGrp ">
          <h2 className="boxHeading">Team Efficiency</h2>

          <PieChart width={250} height={200}>
            <Pie
              data={efficiencyData}
              cx={125}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={efficiencyCOLORS[index % efficiencyCOLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <div className="efficiencyTextGrp">
            <h2 className="boxHeading">Great Job!</h2>

            <p className="text-xs mb-2">
              There has been 9.0% increase in your team’s efficiency versus the
              previous month and the next training is slated for 22nd march
              2024.
            </p>

            <button className="rounded text-white bg-[#095256] text-xs px-3 py-1.5 w-fit text-sm">
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

            <h4 className="text-sm font-semibold text-black mt-3">
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
