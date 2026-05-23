import { useState, ChangeEvent } from "react";
import { Search, Plus, Pencil, Trash2, X, Users } from "lucide-react";
import { useApp, NewEmployeeInput, EmployeeRecord } from "../context/AppContext";
import { ConfirmModal } from "../components/Modal";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const workModeBadge = (mode: string) => {
  const m = mode.toLowerCase();
  if (m === "remote") return "badge-info";
  if (m === "on site" || m === "onsite") return "badge-success";
  return "badge-warning";
};

const contractBadge = (contract: string) => {
  const c = contract.toLowerCase();
  if (c === "full-time") return "badge-primary";
  if (c === "part-time") return "badge-warning";
  return "badge-neutral";
};

// ─── Empty form state ─────────────────────────────────────────────────────────

const EMPTY_FORM: NewEmployeeInput = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  role: "",
  workMode: "On site",
  employmentContract: "Full-time",
  monthlySalary: 0,
};

// ─── Employee Form ────────────────────────────────────────────────────────────

interface EmployeeFormProps {
  initial?: NewEmployeeInput;
  onSubmit: (data: NewEmployeeInput) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  loading: boolean;
}

const EmployeeForm = ({
  initial = EMPTY_FORM,
  onSubmit,
  onCancel,
  submitLabel,
  loading,
}: EmployeeFormProps) => {
  const [form, setForm] = useState<NewEmployeeInput>(initial);

  const set = (field: keyof NewEmployeeInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({
        ...prev,
        [field]:
          field === "monthlySalary"
            ? Number(e.target.value)
            : e.target.value,
      }));

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.department.trim() &&
    form.role.trim() &&
    form.monthlySalary > 0 &&
    form.workMode &&
    form.employmentContract;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">First name</label>
          <input className="form-input" placeholder="Jane" value={form.firstName} onChange={set("firstName")} required />
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input className="form-input" placeholder="Smith" value={form.lastName} onChange={set("lastName")} required />
        </div>
      </div>

      <div>
        <label className="form-label">Email address</label>
        <input type="email" className="form-input" placeholder="jane@company.com" value={form.email} onChange={set("email")} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Department</label>
          <input className="form-input" placeholder="Engineering" value={form.department} onChange={set("department")} required />
        </div>
        <div>
          <label className="form-label">Job title</label>
          <input className="form-input" placeholder="Software Engineer" value={form.role} onChange={set("role")} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Contract type</label>
          <select className="form-select" value={form.employmentContract} onChange={set("employmentContract")}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="form-label">Work mode</label>
          <select className="form-select" value={form.workMode} onChange={set("workMode")}>
            <option value="On site">On site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Monthly salary (₦)</label>
        <input
          type="number"
          className="form-input"
          placeholder="150000"
          value={form.monthlySalary === 0 ? "" : form.monthlySalary}
          onChange={set("monthlySalary")}
          required
        />
        {form.monthlySalary > 0 && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Annual: ₦{(form.monthlySalary * 12).toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn btn-ghost btn-sm flex-1">
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid || loading}
          className="btn btn-primary btn-sm flex-1"
        >
          {loading ? (
            <><span className="spinner" style={{ width: 14, height: 14 }} /> Saving…</>
          ) : (
            <><Plus className="w-3.5 h-3.5" /> {submitLabel}</>
          )}
        </button>
      </div>
    </form>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const Employees = () => {
  const { dbData, employeesLoading, addEmployee, updateEmployee, deleteEmployee } = useApp();

  const [searchFilter, setSearchFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = window.innerWidth < 640 ? 3 : 6;

  const [panelMode, setPanelMode] = useState<"add" | "edit" | null>("add");
  const [editTarget, setEditTarget] = useState<EmployeeRecord | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<EmployeeRecord | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const listOfWorkmodes = [...new Set(dbData.map((e) => e.workMode.toLowerCase()))];
  const listOfContracts = [...new Set(dbData.map((e) => e.employmentContract.toLowerCase()))];

  const filtered = dbData.filter(
    (e) =>
      (!searchFilter   || e.employeeName.toLowerCase().includes(searchFilter.toLowerCase())) &&
      (!workModeFilter || e.workMode.toLowerCase() === workModeFilter) &&
      (!contractFilter || e.employmentContract.toLowerCase() === contractFilter)
  );

  const numberOfPages = Math.ceil(filtered.length / itemsPerPage);
  const pageSlice = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openEdit = (emp: EmployeeRecord) => {
    setEditTarget(emp);
    setPanelMode("edit");
  };

  const handleAdd = async (data: NewEmployeeInput) => {
    setFormLoading(true);
    try { await addEmployee(data); setPanelMode("add"); }
    finally { setFormLoading(false); }
  };

  const handleEdit = async (data: NewEmployeeInput) => {
    if (!editTarget) return;
    setFormLoading(true);
    try {
      await updateEmployee(editTarget.id, data);
      setPanelMode("add");
      setEditTarget(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteEmployee(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Derive initial values for edit form
  const editInitial: NewEmployeeInput | undefined = editTarget
    ? {
        firstName: editTarget.employeeName.split(" ")[0] ?? "",
        lastName: editTarget.employeeName.split(" ").slice(1).join(" ") ?? "",
        email: editTarget.employeeEmail,
        department: editTarget.department,
        role: editTarget.role,
        workMode: editTarget.workMode,
        employmentContract: editTarget.employmentContract,
        monthlySalary: editTarget.employeeFinances.monthlySalary,
      }
    : undefined;

  return (
    <div className="page-section flex flex-col xl:flex-row gap-5">
      {/* ── Employee list ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="page-heading">Employees</h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search…"
                className="form-input pl-9 pr-3 py-1.5 w-44 text-xs"
                value={searchFilter}
                onChange={(e) => { setSearchFilter(e.target.value); setCurrentPage(1); }}
              />
            </div>

            {/* Work mode */}
            <select
              className="form-select py-1.5 text-xs w-auto"
              onChange={(e) => { setWorkModeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All modes</option>
              {listOfWorkmodes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            {/* Contract */}
            <select
              className="form-select py-1.5 text-xs w-auto"
              onChange={(e) => { setContractFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All contracts</option>
              {listOfContracts.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Employee cards */}
        {employeesLoading ? (
          <div className="flex items-center justify-center py-24">
            <span className="spinner spinner-lg" />
          </div>
        ) : pageSlice.length === 0 ? (
          <div className="empty-state card py-24">
            <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="section-title">No employees found</p>
            <p className="text-sm text-slate-400 mt-1">
              {dbData.length === 0
                ? "Add your first employee using the form."
                : "Try adjusting your filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pageSlice.map((emp) => (
              <div
                key={emp.id}
                className="employee-card group"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="employee-avatar w-10 h-10 text-sm">{initials(emp.employeeName)}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize truncate">
                        {emp.employeeName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">
                        {emp.role}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="employee-card-actions flex-shrink-0">
                    <button
                      className="btn-icon"
                      onClick={() => openEdit(emp)}
                      aria-label="Edit employee"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="btn-icon text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                      onClick={() => setDeleteTarget(emp)}
                      aria-label="Delete employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Dept.</span>
                    <span className="text-slate-700 dark:text-slate-300 capitalize">{emp.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Salary</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      ₦{emp.employeeFinances.monthlySalary.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email</span>
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[130px]">{emp.employeeEmail}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className={workModeBadge(emp.workMode)}>{emp.workMode}</span>
                  <span className={contractBadge(emp.employmentContract)}>{emp.employmentContract}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {numberOfPages > 1 && (
          <div className="flex items-center justify-between mt-auto pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
            </p>
            <div className="pagination">
              <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                Prev
              </button>
              {Array.from({ length: numberOfPages }, (_, i) => (
                <button key={i} className={`page-btn ${currentPage === i + 1 ? "active" : ""}`} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPage((p) => Math.min(p + 1, numberOfPages))} disabled={currentPage === numberOfPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add / Edit panel ─────────────────────────────────────── */}
      <div className="w-full xl:w-[340px] flex-shrink-0">
        <div className="card sticky top-5">
          <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="section-title">
              {panelMode === "edit" && editTarget
                ? `Edit: ${editTarget.employeeName.split(" ")[0]}`
                : "Add employee"}
            </h3>
            {panelMode === "edit" && (
              <button
                className="btn-icon"
                onClick={() => { setPanelMode("add"); setEditTarget(null); }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {panelMode === "edit" && editInitial ? (
            <EmployeeForm
              key={editTarget?.id}
              initial={editInitial}
              onSubmit={handleEdit}
              onCancel={() => { setPanelMode("add"); setEditTarget(null); }}
              submitLabel="Save changes"
              loading={formLoading}
            />
          ) : (
            <EmployeeForm
              key="add"
              onSubmit={handleAdd}
              onCancel={() => {}}
              submitLabel="Add employee"
              loading={formLoading}
            />
          )}
        </div>
      </div>

      {/* ── Delete confirm ────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove employee"
        message={`Are you sure you want to remove ${deleteTarget?.employeeName}? This action cannot be undone.`}
        confirmText="Remove"
        isDanger
        loading={deleteLoading}
      />
    </div>
  );
};

export default Employees;
