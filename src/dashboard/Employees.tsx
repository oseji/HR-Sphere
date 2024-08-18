import { useState, ChangeEvent } from "react";

import { db, auth } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { dataType } from "./App";

import { Spinner } from "@chakra-ui/react";

import searchIcon from "../assets/circum_search.png";

type getEmployeeData = () => Promise<void>;

type EmployeeProps = {
  getEmployeeData: getEmployeeData;
  dbData: dataType;
};

const Employees = (props: EmployeeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [employeeName, setEmployeeName] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [jobTitle, setJobTitle] = useState<string>();
  const [workMode, setWorkMode] = useState<string>();
  const [employmentContract, setEmploymentContract] = useState<string>("");
  const [employeeSalary, setEmployeeSalary] = useState<number>(0);
  const [employeeEmail, setEmployeeEmail] = useState<string>();
  const [numberOfKPIs, setNumberOfKPIs] = useState<number>();

  const [searchFilter, setSearchFilter] = useState<string>();
  const [contractFilter, setContractFilter] = useState<string>();
  const [workModeFilter, setWorkModeFilter] = useState<string>();

  const listOfWorkmodes = [
    ...new Set(props.dbData.map((item) => item.workMode.toLowerCase())),
  ];
  const listOfContracts = [
    ...new Set(
      props.dbData.map((item) => item.employmentContract.toLowerCase())
    ),
  ];

  const addEmployee = async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    const taxRate =
      employeeSalary <= 25000
        ? 7
        : employeeSalary <= 50000
        ? 11
        : employeeSalary <= 91667
        ? 15
        : employeeSalary <= 133334
        ? 19
        : employeeSalary <= 266667
        ? 21
        : 24;

    try {
      if (user) {
        await addDoc(collection(db, `users/${user.email}/employeeData`), {
          employeeName: employeeName,
          employeeEmail: employeeEmail,
          employmentContract: employmentContract,
          employeeFinances: {
            monthlySalary: employeeSalary,
            totalSalary: employeeSalary * 12,
            taxes: (employeeSalary * 12 * taxRate) / 100,
            netSalary:
              employeeSalary * 12 - (employeeSalary * 12 * taxRate) / 100,
            isSalaryPaid: false,
          },
          department: department,
          role: jobTitle,
          workMode: workMode,
          numberOfKPIs: numberOfKPIs,

          requests: {
            sickLeave: false,
            maternityLeave: false,
            annualLeave: false,
            resumeUpdate: false,
            profileUpdate: false,
          },

          userID: auth?.currentUser?.uid,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      props.getEmployeeData();

      setEmployeeName("");
      setEmployeeEmail("");
      setEmploymentContract("Full-time");
      setEmployeeSalary(0);
      setDepartment("");
      setJobTitle("");
      setWorkMode("On site");
      setNumberOfKPIs(0);

      setIsLoading(false);
    }
  };

  return (
    <section className="screenSection w-full flex flex-col lg:flex-row lg:justify-between gap-3 text-sm">
      <div className="employeeList w-full lg:w-2/3">
        {/* HEADER */}
        <div className="flex flex-row items-center justify-between">
          <h1 className="boxHeading">Employees</h1>

          <div className=" flex flex-row items-center gap-3">
            <div className="employeeScreenSearchGrp">
              <img src={searchIcon} alt="search icon" className="h-5" />

              {/* SEARCH FILTER */}
              <input
                type="text"
                placeholder="Search for employee"
                className="w-full text-xs placeholder:text-xs dark:placeholder:text-white"
                value={searchFilter}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearchFilter(e.currentTarget.value);
                }}
              />
            </div>

            {/* WORKMODES FILTER */}
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setWorkModeFilter(e.target.value);
              }}
            >
              <option value="">All</option>

              {listOfWorkmodes.map((element, index) => (
                <option value={element.toLowerCase()} key={index}>
                  {element}
                </option>
              ))}
            </select>

            {/* CONTRACT FILTER */}
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setContractFilter(e.target.value);
              }}
            >
              <option value="">All</option>

              {listOfContracts.map((element, index) => (
                <option value={element.toLowerCase()} key={index}>
                  {element}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isLoading && (
          <div className="employeeListGrp">
            {props.dbData
              .filter(
                (e) =>
                  (!searchFilter ||
                    e.employeeName
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase())) &&
                  (!workModeFilter ||
                    e.workMode.toLowerCase() === workModeFilter) &&
                  (!contractFilter ||
                    e.employmentContract.toLowerCase() === contractFilter)
              )
              .map((element, index) => (
                <div className="employeeItem" key={index}>
                  <p className="staffName">{element.employeeName}</p>

                  <p className=" text-xs">Email : {element.employeeEmail}</p>

                  <p className="staffData">Department : {element.department}</p>

                  <p className="staffData">Role : {element.role}</p>

                  <p className="staffData">
                    Salary :{" "}
                    {element.employeeFinances.monthlySalary.toLocaleString()}
                  </p>

                  <p className="staffData">
                    Contract : {element.employmentContract}
                  </p>

                  <p className="staffData">Work Mode : {element.workMode}</p>

                  <p className="staffData">
                    Number of KPIs : {element.numberOfKPIs}
                  </p>
                </div>
              ))}
          </div>
        )}

        {isLoading && (
          <div className=" flex flex-row items-center justify-center w-full min-h-screen">
            <Spinner></Spinner>
          </div>
        )}
      </div>

      {/* ADD EMPLOYEE FORM */}
      <div className="addEmployeeForm w-full lg:w-1/3">
        <h1 className="boxHeading">Add new employee</h1>

        <form className="employeeDataForm">
          <div className="employeeFormInputGrp">
            <div className="employeeDataInput">
              <label htmlFor="employeeName">Name</label>
              <input
                required
                type="text"
                id="employeeName"
                placeholder="Enter name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>

            <div className="employeeDataInput">
              <label htmlFor="employeeEmail">Email</label>
              <input
                required
                type="email"
                id="employeeEmail"
                placeholder="Enter email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="employeeFormInputGrp">
            <div className="employeeDataInput">
              <label htmlFor="employeeDepartment">Department</label>
              <input
                required
                type="text"
                id="employeeDepartment"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="employeeDataInput">
              <label htmlFor="employeeJobTitle">Job title</label>
              <input
                required
                type="text"
                id="employeeJobTitle"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="employeeFormInputGrp">
            <div className="employeeDataInput">
              <label htmlFor="contract">Contract</label>
              <select
                required
                name="contract"
                id="contract"
                onChange={(e) => setEmploymentContract(e.target.value)}
              >
                <option value="">Select contract</option>
                <option value="Full-time">Full-Time</option>
                <option value="Part-time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="employeeDataInput">
              <label htmlFor="workMode">Work mode</label>
              <select
                required
                name="workMode"
                id="workMode"
                onChange={(e) => setWorkMode(e.target.value)}
              >
                <option value="">Select work mode</option>
                <option value="On site">On site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="employeeFormInputGrp">
            <div className="employeeDataInput">
              <label htmlFor="salary">Salary</label>
              <input
                required
                type="number"
                id="salary"
                placeholder="Enter salary"
                value={employeeSalary === 0 ? "" : employeeSalary}
                onChange={(e) =>
                  setEmployeeSalary(Number(Number(e.target.value)))
                }
              />
            </div>

            <div className="employeeDataInput">
              <label htmlFor="numberOfKPIs">Number of KPIs</label>
              <input
                required
                type="number"
                id="numberOfKPIs"
                placeholder="Enter number of KPIs"
                value={numberOfKPIs === 0 ? "" : numberOfKPIs}
                onChange={(e) => setNumberOfKPIs(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            className=" bg-buttonGreen text-white dark:bg-darkModeGreen px-4 py-2 rounded-md w-fit mt-3"
            onClick={(e) => {
              e.preventDefault();
              addEmployee();
            }}
          >
            Add Employee
          </button>
        </form>
      </div>
    </section>
  );
};

export default Employees;
