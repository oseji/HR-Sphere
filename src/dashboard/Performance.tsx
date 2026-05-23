import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { ChangeEvent, useState } from "react";
import { TrendingUp, Award } from "lucide-react";

import { data, efficiencyData, keyIndicator } from "../types";
import { useApp } from "../context/AppContext";
import eomImg from "../assets/employee of the month.png";
import upArrow from "../assets/up growth.svg";

// Helpers

// Stable performance score based on employee ID hash
const stableScore = (id: string): 1 | 2 | 3 | 4 => {
    const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return ((hash % 4) + 1) as 1 | 2 | 3 | 4;
};

const performanceLabel = (score: 1 | 2 | 3 | 4) => {
    const map = {
        1: { label: "Poor", cls: "badge-danger" },
        2: { label: "Average", cls: "badge-warning" },
        3: { label: "Above Average", cls: "badge-info" },
        4: { label: "Excellent", cls: "badge-success" },
    };
    return map[score];
};

//  Component

const Performance = () => {
    const { dbData } = useApp();

    const COLORS = ["#095256", "#06D6A0"];
    const EFFICIENCY_COLORS = ["#06D6A0", "#f1f5f9"];

    const [departmentFilter, setDepartmentFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const listOfDepartments = [
        ...new Set(dbData.map((e) => e.department.toLowerCase())),
    ];

    const filtered = dbData.filter(
        (e) =>
            !departmentFilter ||
            e.department.toLowerCase() === departmentFilter,
    );
    const numberOfPages = Math.ceil(filtered.length / itemsPerPage);
    const pageSlice = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Pie data derived from real dbData
    const contractCount = dbData.filter(
        (e) => e.employmentContract.toLowerCase() !== "full-time",
    ).length;
    const fulltimeCount = dbData.filter(
        (e) => e.employmentContract.toLowerCase() === "full-time",
    ).length;
    const realPieData = [
        { name: "Contract staff", value: contractCount || data[0].value },
        { name: "Full-time staff", value: fulltimeCount || data[1].value },
    ];

    return (
        <div className="performance-section page-section">
            {/*  Left column  */}
            <div className="flex flex-col flex-1 min-w-0 gap-5">
                {/* Charts row */}
                <div className="flex flex-col gap-5 lg:flex-row">
                    {/* Total employee pie */}
                    <div className="flex-shrink-0 p-5 card lg:w-60">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="section-title">Total Employees</h3>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                                {dbData.length}
                            </span>
                        </div>

                        <PieChart width={200} height={180} className="mx-auto">
                            <Pie
                                data={realPieData}
                                cx={100}
                                cy={90}
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={6}
                                dataKey="value"
                            >
                                {realPieData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    fontSize: 11,
                                    borderRadius: 8,
                                    border: "1px solid #e2e8f0",
                                }}
                            />
                        </PieChart>

                        <div className="chart-legend">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-sm bg-buttonGreen flex-shrink-0" />
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Contract
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-sm bg-[#06D6A0] flex-shrink-0" />
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Full-time
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* KPI line chart */}
                    <div className="flex-1 min-w-0 p-5 overflow-x-auto card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="section-title">
                                Key Performance Indicators
                            </h3>
                            <select className="form-select w-auto py-1.5 text-xs">
                                <option>All departments</option>
                                <option>Product</option>
                                <option>Engineering</option>
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={170}>
                            <LineChart
                                data={keyIndicator}
                                margin={{ right: 15, top: 5, left: -30 }}
                            >
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        fontSize: 11,
                                        borderRadius: 8,
                                        border: "1px solid #e2e8f0",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="val1"
                                    stroke="#818CF8"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="val2"
                                    stroke="#FBBF24"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="val3"
                                    stroke="#A855F7"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="chart-legend">
                            {[
                                {
                                    color: "#818CF8",
                                    label: "Monthly Active Users",
                                },
                                {
                                    color: "#FBBF24",
                                    label: "Customer Satisfaction",
                                },
                                { color: "#A855F7", label: "Churn Rate" },
                            ].map(({ color, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-1.5"
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                                        style={{ background: color }}
                                    />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance table */}
                <div className="overflow-hidden card">
                    <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="section-title">Performance Overview</h3>
                        <div className="flex items-center gap-2">
                            <select className="form-select w-auto py-1.5 text-xs">
                                <option value="qtr1">Q1</option>
                                <option value="qtr2">Q2</option>
                                <option value="qtr3">Q3</option>
                                <option value="qtr4">Q4</option>
                            </select>
                            <select
                                className="form-select w-fit py-1.5 text-xs"
                                onChange={(
                                    e: ChangeEvent<HTMLSelectElement>,
                                ) => {
                                    setDepartmentFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">All departments</option>
                                {listOfDepartments.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Job title</th>
                                    <th>Department</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageSlice.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-16 text-center text-slate-400"
                                        >
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                                    pageSlice.map((emp) => {
                                        const score = stableScore(emp.id);
                                        const { label, cls } =
                                            performanceLabel(score);
                                        return (
                                            <tr key={emp.id}>
                                                <td>
                                                    <div className="employee-cell">
                                                        <div className="employee-avatar">
                                                            {emp.employeeName
                                                                .slice(0, 2)
                                                                .toUpperCase()}
                                                        </div>
                                                        <span className="capitalize">
                                                            {emp.employeeName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="capitalize">
                                                    {emp.role}
                                                </td>
                                                <td className="capitalize">
                                                    {emp.department}
                                                </td>
                                                <td>
                                                    <span className={cls}>
                                                        {label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {numberOfPages > 1 && (
                        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-500">
                                {(currentPage - 1) * itemsPerPage + 1}–
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    filtered.length,
                                )}{" "}
                                of {filtered.length}
                            </p>
                            <div className="pagination">
                                <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(p - 1, 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                {Array.from(
                                    { length: numberOfPages },
                                    (_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                            onClick={() =>
                                                setCurrentPage(i + 1)
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    ),
                                )}
                                <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(p + 1, numberOfPages),
                                        )
                                    }
                                    disabled={currentPage === numberOfPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/*  Right column  */}
            <div className="flex flex-col flex-shrink-0 gap-5 xl:w-64">
                {/* Team efficiency gauge */}
                <div className="p-5 card">
                    <h3 className="mb-3 section-title">Team Efficiency</h3>

                    <PieChart width={220} height={130} className="mx-auto">
                        <Pie
                            data={efficiencyData}
                            cx={110}
                            cy={110}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {efficiencyData.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={
                                        EFFICIENCY_COLORS[
                                            i % EFFICIENCY_COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>

                    <div className="-mt-8 text-center">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            80%
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                            <img src={upArrow} alt="" className="h-3" />
                            +9.0% this month
                        </div>
                    </div>

                    <div className="p-3 mt-4 border rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800">
                        <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            Great job!
                        </p>
                        <p className="text-xs leading-relaxed text-emerald-600 dark:text-emerald-500">
                            9% efficiency increase vs last month. Next training:
                            22 Mar.
                        </p>
                    </div>

                    <button className="justify-center w-full mt-3 btn btn-primary btn-sm">
                        <TrendingUp className="w-3.5 h-3.5" /> Compare scores
                    </button>
                </div>

                {/* Employee of the month */}
                <div className="p-5 card">
                    <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h3 className="section-title">Employee of the Month</h3>
                    </div>

                    <div className="mb-4 text-center">
                        <img
                            src={eomImg}
                            alt="Employee of the month"
                            className="object-cover w-20 h-20 mx-auto mb-3 rounded-full ring-4 ring-faintGreen dark:ring-darkModeGreen"
                        />
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            Ronald Richards
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Product Designer
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            {
                                label: "Performance",
                                value: "78%",
                                avg: "avg 40%",
                            },
                            {
                                label: "Attendance",
                                value: "99%",
                                avg: "avg 75%",
                            },
                            { label: "KPIs", value: "14", avg: "avg 10" },
                        ].map(({ label, value, avg }) => (
                            <div
                                key={label}
                                className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                            >
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-0.5">
                                    {label}
                                </p>
                                <p className="text-sm font-bold text-buttonGreen dark:text-[#A9F2F6]">
                                    {value}
                                </p>
                                <p className="text-[9px] text-slate-400">
                                    {avg}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;
