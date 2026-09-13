import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChangeEvent, useState } from "react";
import {
    Users,
    UserMinus,
    Inbox,
    CheckCircle2,
    XCircle,
    ChevronRight,
} from "lucide-react";

import { chartData } from "../types";
import { useApp, RequestType } from "../context/AppContext";
import { tooltipStyle, tickColor, gridColor } from "../lib/chart";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const workModeBadge = (mode: string) => {
    const m = mode.toLowerCase();
    if (m === "remote") return "badge-info";
    if (m === "on site" || m === "onsite") return "badge-success";
    return "badge-warning";
};

const initials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

// ─── Request types ────────────────────────────────────────────────────────────

type RequestMeta = { key: RequestType; label: string };

const REQUEST_TYPES: RequestMeta[] = [
    { key: "sickLeave", label: "Sick Leave" },
    { key: "maternityLeave", label: "Maternity Leave" },
    { key: "annualLeave", label: "Annual Leave" },
    { key: "resumeUpdate", label: "Resume Update" },
    { key: "profileUpdate", label: "Profile Update" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Stats = () => {
    const { dbData, toggleRequest, isDark } = useApp();

    const [chartYears, setChartYears] = useState(5);
    const currentChartData = chartData.slice(chartData.length - chartYears);

    const [searchFilter, setSearchFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [jobTitleFilter, setJobTitleFilter] = useState("");
    const [workTypeFilter, setWorkTypeFilter] = useState("");

    const [expandedRequest, setExpandedRequest] = useState<RequestType | null>(
        null,
    );
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const listOfDepartments = [
        ...new Set(dbData.map((e) => e.department.toLowerCase())),
    ];
    const listOfWorkmodes = [
        ...new Set(dbData.map((e) => e.workMode.toLowerCase())),
    ];
    const listOfRoles = [...new Set(dbData.map((e) => e.role.toLowerCase()))];

    const filtered = dbData.filter(
        (e) =>
            (!departmentFilter ||
                e.department.toLowerCase() === departmentFilter) &&
            (!workTypeFilter || e.workMode.toLowerCase() === workTypeFilter) &&
            (!jobTitleFilter || e.role.toLowerCase() === jobTitleFilter) &&
            (!searchFilter ||
                e.employeeName
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())),
    );

    const numberOfPages = Math.ceil(filtered.length / itemsPerPage);
    const pageSlice = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleRequest = async (
        employeeId: string,
        requestType: RequestType,
        approve: boolean,
    ) => {
        const key = `${employeeId}-${requestType}`;
        setActionLoading(key);
        try {
            await toggleRequest(employeeId, requestType, approve);
        } finally {
            setActionLoading(null);
        }
    };

    // ── Total pending requests count
    const totalPending = dbData.reduce((acc, e) => {
        return acc + Object.values(e.requests).filter(Boolean).length;
    }, 0);

    return (
        <div className="flex flex-col gap-5 p-5">
            <h2 className="page-heading">Overview</h2>

            {/* ── Stat cards ───────────────────────────────────────────── */}
            <div className="stats-grid">
                {/* Employees */}
                <div className="flex flex-col gap-4 stat-card">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                            Total Employees
                        </p>
                        <div className="stat-icon-wrap bg-faintGreen dark:bg-darkModeGreen">
                            <Users className="w-5 h-5 text-buttonGreen dark:text-[#A9F2F6]" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {dbData.length}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Active headcount</p>
                </div>

                {/* Resignations */}
                <div className="flex flex-col gap-4 stat-card">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                            Resignations
                        </p>
                        <div className="stat-icon-wrap bg-red-50 dark:bg-red-900/20">
                            <UserMinus className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        0
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">This month</p>
                </div>

                {/* Pending requests */}
                <div className="flex flex-col gap-4 stat-card">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                            Pending Requests
                        </p>
                        <div className="stat-icon-wrap bg-amber-50 dark:bg-amber-900/20">
                            <Inbox className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {totalPending}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Awaiting review</p>
                </div>
            </div>

            {/* ── Chart + Requests ─────────────────────────────────────── */}
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* Bar chart */}
                <div className="flex-1 min-w-0 p-5 overflow-x-auto card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="section-title">
                            Retention & Turnover Rate
                        </h3>
                        <select
                            className="form-select w-auto text-xs py-1.5"
                            aria-label="Chart time range"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setChartYears(Number(e.target.value))
                            }
                        >
                            {[5, 4, 3, 2, 1].map((y) => (
                                <option key={y} value={y}>
                                    Last {y} year{y > 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div
                        role="img"
                        aria-label={`Bar chart of retention and turnover rate for the last ${chartYears} year${chartYears > 1 ? "s" : ""}`}
                    >
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                            data={currentChartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke={gridColor(isDark)}
                            />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: tickColor(isDark) }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: tickColor(isDark) }}
                                axisLine={false}
                                tickLine={false}
                                width={36}
                                unit="%"
                            />
                            <Tooltip
                                cursor={{ fill: isDark ? "#ffffff0d" : "#0f172a0a" }}
                                contentStyle={tooltipStyle(isDark)}
                                formatter={(v: number) => `${v}%`}
                            />
                            <Bar
                                dataKey="RetentionRate"
                                name="Retention rate"
                                fill={isDark ? "#0E7C82" : "#095256"}
                                radius={[4, 4, 0, 0]}
                                isAnimationActive={false}
                                activeBar={<Rectangle fill={isDark ? "#139AA2" : "#074144"} />}
                            />
                            <Bar
                                dataKey="TurnoverRate"
                                name="Turnover rate"
                                fill="#059669"
                                radius={[4, 4, 0, 0]}
                                isAnimationActive={false}
                                activeBar={<Rectangle fill="#047857" />}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>

                    <div className="chart-legend" aria-hidden="true">
                        <div className="flex items-center gap-2 chart-legend-item">
                            <span className="chart-legend-dot bg-buttonGreen dark:bg-[#0E7C82]" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Retention Rate
                            </span>
                        </div>
                        <div className="flex items-center gap-2 chart-legend-item">
                            <span className="chart-legend-dot bg-[#059669]" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Turnover Rate
                            </span>
                        </div>
                    </div>
                </div>

                {/* Requests */}
                <div className="flex-shrink-0 w-full p-5 card lg:w-72">
                    <h3 className="mb-4 section-title">Leave Requests</h3>

                    <div className="flex flex-col">
                        {REQUEST_TYPES.map(({ key, label }) => {
                            const requesters = dbData.filter(
                                (e) => e.requests[key],
                            );
                            const count = requesters.length;
                            const isExpanded = expandedRequest === key;

                            return (
                                <div key={key}>
                                    <button
                                        className="w-full request-row"
                                        aria-expanded={isExpanded}
                                        onClick={() =>
                                            setExpandedRequest(
                                                isExpanded ? null : key,
                                            )
                                        }
                                    >
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                            {label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {count > 0 && (
                                                <span className="text-xs badge badge-warning">
                                                    {count}
                                                </span>
                                            )}
                                            <ChevronRight
                                                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                                    isExpanded
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    {/* Expanded requester list */}
                                    {isExpanded && (
                                        <div className="ml-2 mb-2 flex flex-col gap-1.5">
                                            {count === 0 ? (
                                                <p className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                                                    No pending requests
                                                </p>
                                            ) : (
                                                requesters.map((emp) => {
                                                    const loadKey = `${emp.id}-${key}`;
                                                    return (
                                                        <div
                                                            key={emp.id}
                                                            className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 py-1.5"
                                                        >
                                                            <span className="text-xs text-slate-700 dark:text-slate-300 capitalize truncate max-w-[100px]">
                                                                {
                                                                    emp.employeeName
                                                                }
                                                            </span>
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() =>
                                                                        handleRequest(
                                                                            emp.id,
                                                                            key,
                                                                            true,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading ===
                                                                        loadKey
                                                                    }
                                                                    className="btn-icon !p-1.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-800 disabled:opacity-50"
                                                                    aria-label={`Approve ${label.toLowerCase()} for ${emp.employeeName}`}
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleRequest(
                                                                            emp.id,
                                                                            key,
                                                                            false,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        actionLoading ===
                                                                        loadKey
                                                                    }
                                                                    className="btn-icon !p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 disabled:opacity-50"
                                                                    aria-label={`Deny ${label.toLowerCase()} for ${emp.employeeName}`}
                                                                >
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/*  Employee table  */}
            <div className="overflow-hidden card">
                {/* Table header */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="section-title">Employees</h3>

                    <div className="flex flex-wrap items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search…"
                            aria-label="Search employees by name"
                            className="form-input w-44 py-1.5 text-xs"
                            value={searchFilter}
                            onChange={(e) => {
                                setSearchFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        <select
                            className="form-select w-auto py-1.5 text-xs"
                            aria-label="Filter by work mode"
                            onChange={(e) => {
                                setWorkTypeFilter(e.target.value.toLowerCase());
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">All work modes</option>
                            {listOfWorkmodes.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <select
                            className="form-select w-auto py-1.5 text-xs"
                            aria-label="Filter by job title"
                            onChange={(e) => {
                                setJobTitleFilter(e.target.value.toLowerCase());
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">All roles</option>
                            {listOfRoles.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>

                        <select
                            className="form-select w-auto py-1.5 text-xs"
                            aria-label="Filter by department"
                            onChange={(e) => {
                                setDepartmentFilter(
                                    e.target.value.toLowerCase(),
                                );
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

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Job title</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Work mode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageSlice.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-16 text-center text-slate-500 dark:text-slate-400"
                                    >
                                        {dbData.length === 0
                                            ? "No employees yet. Add your first employee."
                                            : "No employees match the current filters."}
                                    </td>
                                </tr>
                            ) : (
                                pageSlice.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <div className="employee-cell">
                                                <div className="employee-avatar">
                                                    {initials(emp.employeeName)}
                                                </div>
                                                <span className="capitalize ">
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
                                        <td className="lowercase">
                                            {emp.employeeEmail}
                                        </td>
                                        <td>
                                            <span
                                                className={workModeBadge(
                                                    emp.workMode,
                                                )}
                                            >
                                                {emp.workMode}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {numberOfPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Showing {(currentPage - 1) * itemsPerPage + 1}–
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
                                    setCurrentPage((p) => Math.max(p - 1, 1))
                                }
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            {Array.from({ length: numberOfPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
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
    );
};

export default Stats;
