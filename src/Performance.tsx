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
import { pieChartData, employeeOverview } from "./types";
import { useState, useRef, SyntheticEvent } from "react";

const Performance = () => {
  const data: pieChartData[] = [
    { name: "contractStaff", value: 127 },
    { name: "fulltimeStaff", value: 273 },
  ];
  const COLORS = ["#06D6A0", "#095256"];

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
            <div className="flex flex-row justify-between items-center text-black font-semibold">
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
              <h2 className="font-semibold">Key Performance Indicators</h2>

              <select className="capitalize">
                <option value="all departments">all departments</option>
                <option value="product">product</option>
                <option value="engineering">engineering</option>
              </select>
            </div>
          </div>
        </div>

        <div className="employeePerformanceTable">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-semibold text-black">Performance Overview</h2>

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
                    <td>{value.monthlyAvg}</td>
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
    </section>
  );
};

export default Performance;
