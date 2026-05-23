import { ChangeEvent, useState } from "react";
import { Download, Printer, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const fmt = (n: number) =>
  "₦" +
  n.toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const PERIODS = [
  "May 2025",
  "April 2025",
  "March 2025",
  "February 2025",
  "January 2025",
];

// ─── CSV export ───────────────────────────────────────────────────────────────

const exportCSV = (
  data: ReturnType<typeof useApp>["dbData"],
  period: string
) => {
  const header = [
    "Employee",
    "Email",
    "Department",
    "Contract",
    "Monthly Salary",
    "Annual Salary",
    "Annual Tax",
    "Net Salary",
    "Status",
  ].join(",");

  const rows = data.map((e) =>
    [
      `"${e.employeeName}"`,
      `"${e.employeeEmail}"`,
      `"${e.department}"`,
      `"${e.employmentContract}"`,
      e.employeeFinances.monthlySalary,
      e.employeeFinances.totalSalary,
      e.employeeFinances.taxes.toFixed(2),
      e.employeeFinances.netSalary.toFixed(2),
      e.employeeFinances.isSalaryPaid ? "Paid" : "Not paid",
    ].join(",")
  );

  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payroll-${period.replace(/ /g, "-").toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Component ────────────────────────────────────────────────────────────────

const Payroll = () => {
  const { dbData, togglePayrollStatus } = useApp();

  const [period, setPeriod]             = useState(PERIODS[0]);
  const [departmentFilter, setDeptFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");
  const [toggling, setToggling]         = useState<string | null>(null);

  const listOfDepartments = [...new Set(dbData.map((e) => e.department.toLowerCase()))];
  const listOfContracts   = [...new Set(dbData.map((e) => e.employmentContract.toLowerCase()))];

  const filtered = dbData.filter(
    (e) =>
      (!departmentFilter || e.department.toLowerCase() === departmentFilter) &&
      (!contractFilter   || e.employmentContract.toLowerCase() === contractFilter)
  );

  const totalPaid    = filtered.filter((e) => e.employeeFinances.isSalaryPaid).length;
  const totalNotPaid = filtered.length - totalPaid;
  const totalNet     = filtered.reduce((s, e) => s + e.employeeFinances.netSalary, 0);

  const handleToggle = async (id: string, current: boolean) => {
    setToggling(id);
    try { await togglePayrollStatus(id, !current); }
    finally { setToggling(null); }
  };

  return (
    <div className="page-section flex flex-col gap-5">
      {/* ── Summary cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Total Net Payroll</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{fmt(totalNet)}</p>
          <p className="text-xs text-slate-400 mt-1">For {filtered.length} employees</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Paid</p>
          <p className="text-2xl font-bold text-emerald-600">{totalPaid}</p>
          <p className="text-xs text-slate-400 mt-1">Employees marked paid</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{totalNotPaid}</p>
          <p className="text-xs text-slate-400 mt-1">Awaiting payment</p>
        </div>
      </div>

      {/* ── Payroll table ─────────────────────────────────────────── */}
      <div className="card overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <select
            className="form-select py-1.5 text-sm font-medium w-auto"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>Payroll — {p}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => window.print()}
              aria-label="Print"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => exportCSV(filtered, period)}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800/50 flex flex-wrap gap-2">
          <select
            className="form-select py-1.5 text-xs w-auto"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setContractFilter(e.target.value)
            }
          >
            <option value="">All employees</option>
            {listOfContracts.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            className="form-select py-1.5 text-xs w-auto"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDeptFilter(e.target.value)
            }
          >
            <option value="">All departments</option>
            {listOfDepartments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Annual salary</th>
                <th>Per month</th>
                <th>Annual tax</th>
                <th>Net salary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    No payroll data available
                  </td>
                </tr>
              ) : (
                filtered.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">{initials(emp.employeeName)}</div>
                        <div>
                          <p className="capitalize">{emp.employeeName}</p>
                          <p className="text-xs text-slate-400 font-normal capitalize">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="capitalize">{emp.department}</td>
                    <td>{fmt(emp.employeeFinances.totalSalary)}</td>
                    <td>{fmt(emp.employeeFinances.monthlySalary)}</td>
                    <td className="text-red-500">{fmt(Math.round(emp.employeeFinances.taxes))}</td>
                    <td className="font-medium text-slate-900 dark:text-white">
                      {fmt(Math.round(emp.employeeFinances.netSalary))}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggle(emp.id, emp.employeeFinances.isSalaryPaid)}
                        disabled={toggling === emp.id}
                        className={`badge cursor-pointer transition-all hover:opacity-80 active:scale-95 ${
                          emp.employeeFinances.isSalaryPaid
                            ? "badge-success"
                            : "badge-danger"
                        }`}
                        aria-label={
                          emp.employeeFinances.isSalaryPaid
                            ? "Mark as unpaid"
                            : "Mark as paid"
                        }
                        title="Click to toggle payment status"
                      >
                        {toggling === emp.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : emp.employeeFinances.isSalaryPaid ? (
                          "Paid"
                        ) : (
                          "Not paid"
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
