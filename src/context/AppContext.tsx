import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────

export type EmployeeRecord = {
  employeeName: string;
  employeeEmail: string;
  employmentContract: string;
  employeeFinances: {
    monthlySalary: number;
    totalSalary: number;
    taxes: number;
    netSalary: number;
    isSalaryPaid: boolean;
  };
  department: string;
  role: string;
  workMode: string;
  requests: {
    sickLeave: boolean;
    maternityLeave: boolean;
    annualLeave: boolean;
    resumeUpdate: boolean;
    profileUpdate: boolean;
  };
  id: string;
};

export type RequestType = keyof EmployeeRecord["requests"];

export type NewEmployeeInput = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  workMode: string;
  employmentContract: string;
  monthlySalary: number;
};

// ─── Context interface ───────────────────────────────────────────────────────

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  loginLoading: boolean;
  admin: string;
  authError: string;
  setAuthError: (v: string) => void;
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  // Employees
  dbData: EmployeeRecord[];
  employeesLoading: boolean;
  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  createAccount: (
    email: string,
    password: string,
    confirm: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
  // Employee methods
  getEmployeeData: () => Promise<void>;
  addEmployee: (data: NewEmployeeInput) => Promise<void>;
  updateEmployee: (id: string, data: NewEmployeeInput) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  toggleRequest: (
    employeeId: string,
    requestType: RequestType,
    approve: boolean
  ) => Promise<void>;
  togglePayrollStatus: (employeeId: string, isPaid: boolean) => Promise<void>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const calcTaxRate = (salary: number) =>
  salary <= 25000
    ? 7
    : salary <= 50000
    ? 11
    : salary <= 91667
    ? 15
    : salary <= 133334
    ? 19
    : salary <= 266667
    ? 21
    : 24;

const cleanError = (msg: string) =>
  msg
    .replace("Firebase: ", "")
    .replace("Error ", "")
    .replace("auth/", "")
    .replace(/[()]/g, "")
    .replace(/-/g, " ");

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [admin, setAdmin] = useState("");
  const [authError, setAuthError] = useState("");
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [dbData, setDbData] = useState<EmployeeRecord[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  // Apply dark mode class on mount and change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // ─── Employee data ──────────────────────────────────────────────────────

  const getEmployeeData = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setEmployeesLoading(true);
    try {
      const q = collection(db, `users/${user.email}/employeeData`);
      const docs = (await getDocs(q)).docs;
      setDbData(
        docs.map((d) => ({ ...d.data(), id: d.id })) as EmployeeRecord[]
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load employees");
    } finally {
      setEmployeesLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getEmployeeData();
      const email = auth.currentUser?.email;
      if (email) setAdmin(email.split("@")[0]);
    }
  }, [isLoggedIn]);

  // ─── Auth ────────────────────────────────────────────────────────────────

  const signIn = async (email: string, password: string) => {
    setLoginLoading(true);
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (err) {
      setAuthError(
        err instanceof Error ? cleanError(err.message) : "Unexpected error"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const createAccount = async (
    email: string,
    password: string,
    confirm: string
  ) => {
    setLoginLoading(true);
    setAuthError("");
    try {
      if (password !== confirm) throw new Error("Passwords do not match");
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (err) {
      setAuthError(
        err instanceof Error ? cleanError(err.message) : "Unexpected error"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setDbData([]);
      setAdmin("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out");
    }
  };

  // ─── Employee CRUD ───────────────────────────────────────────────────────

  const addEmployee = async (data: NewEmployeeInput) => {
    const user = auth.currentUser;
    if (!user) return;
    const taxRate = calcTaxRate(data.monthlySalary);
    const annual = data.monthlySalary * 12;
    await addDoc(collection(db, `users/${user.email}/employeeData`), {
      employeeName: `${data.firstName} ${data.lastName}`,
      employeeEmail: data.email,
      employmentContract: data.employmentContract,
      employeeFinances: {
        monthlySalary: data.monthlySalary,
        totalSalary: annual,
        taxes: (annual * taxRate) / 100,
        netSalary: annual - (annual * taxRate) / 100,
        isSalaryPaid: false,
      },
      department: data.department,
      role: data.role,
      workMode: data.workMode,
      requests: {
        sickLeave: false,
        maternityLeave: false,
        annualLeave: false,
        resumeUpdate: false,
        profileUpdate: false,
      },
      userID: auth.currentUser?.uid,
    });
    await getEmployeeData();
    toast.success("Employee added successfully");
  };

  const updateEmployee = async (id: string, data: NewEmployeeInput) => {
    const user = auth.currentUser;
    if (!user) return;
    const taxRate = calcTaxRate(data.monthlySalary);
    const annual = data.monthlySalary * 12;
    const ref = doc(db, `users/${user.email}/employeeData`, id);
    await updateDoc(ref, {
      employeeName: `${data.firstName} ${data.lastName}`,
      employeeEmail: data.email,
      employmentContract: data.employmentContract,
      "employeeFinances.monthlySalary": data.monthlySalary,
      "employeeFinances.totalSalary": annual,
      "employeeFinances.taxes": (annual * taxRate) / 100,
      "employeeFinances.netSalary": annual - (annual * taxRate) / 100,
      department: data.department,
      role: data.role,
      workMode: data.workMode,
    });
    await getEmployeeData();
    toast.success("Employee updated");
  };

  const deleteEmployee = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, `users/${user.email}/employeeData`, id);
    await deleteDoc(ref);
    setDbData((prev) => prev.filter((e) => e.id !== id));
    toast.success("Employee removed");
  };

  const toggleRequest = async (
    employeeId: string,
    requestType: RequestType,
    approve: boolean
  ) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, `users/${user.email}/employeeData`, employeeId);
    await updateDoc(ref, { [`requests.${requestType}`]: false });
    setDbData((prev) =>
      prev.map((e) =>
        e.id === employeeId
          ? { ...e, requests: { ...e.requests, [requestType]: false } }
          : e
      )
    );
    toast.success(approve ? "Request approved" : "Request denied");
  };

  const togglePayrollStatus = async (employeeId: string, isPaid: boolean) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, `users/${user.email}/employeeData`, employeeId);
    await updateDoc(ref, { "employeeFinances.isSalaryPaid": isPaid });
    setDbData((prev) =>
      prev.map((e) =>
        e.id === employeeId
          ? { ...e, employeeFinances: { ...e.employeeFinances, isSalaryPaid: isPaid } }
          : e
      )
    );
    toast.success(isPaid ? "Marked as paid" : "Marked as unpaid");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        loginLoading,
        admin,
        authError,
        setAuthError,
        isDark,
        toggleTheme,
        dbData,
        employeesLoading,
        signIn,
        createAccount,
        logOut,
        getEmployeeData,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleRequest,
        togglePayrollStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
