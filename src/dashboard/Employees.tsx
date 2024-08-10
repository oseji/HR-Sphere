import { useEffect, useState } from "react";

import { db, auth } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { dataType } from "./App";

type getEmployeeData = () => Promise<void>;

type EmployeeProps = {
  getEmployeeData: getEmployeeData;
  dbData: dataType;
};

const Employees = (props: EmployeeProps) => {
  useEffect(() => {
    console.log(props.dbData);
  }, [props.dbData]);

  const [employeeName, setEmployeeName] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [jobTitle, setJobTitle] = useState<string>();
  const [workMode, setWorkMode] = useState<string>();
  const [employmentContract, setEmploymentContract] = useState<string>("");
  const [employeeSalary, setEmployeeSalary] = useState<number>();
  const [employeeEmail, setEmployeeEmail] = useState<string>();
  const [numberOfKPIs, setNumberOfKPIs] = useState<number>();

  const addEmployee = async () => {
    const user = auth.currentUser;
    try {
      if (user) {
        await addDoc(collection(db, `users/${user.email}/employeeData`), {
          employeeName: employeeName,
          employeeEmail: employeeEmail,
          employmentContract: employmentContract,
          employeeSalary: employeeSalary,
          department: department,
          role: jobTitle,
          workMode: workMode,
          numberOfKPIs: numberOfKPIs,

          userID: auth?.currentUser?.uid,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      props.getEmployeeData();

      setEmployeeName("");
      setEmployeeEmail("");
      setEmploymentContract("");
      setEmployeeSalary(0);
      setDepartment("");
      setJobTitle("");
      setWorkMode("");
      setNumberOfKPIs(0);
    }
  };

  return (
    <section className="screenSection w-full flex flex-col lg:flex-row lg:justify-between gap-3 text-sm">
      <div className="employeeList w-full lg:w-2/3">
        <div className="flex flex-row items-center justify-between">
          <h1 className="boxHeading">Employees</h1>

          <div className=" flex flex-row items-center gap-3">
            <select>
              <option value="remote">remote</option>
              <option value="on site">on site</option>
            </select>

            <select>
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="internship">internship</option>
            </select>
          </div>
        </div>

        <div className="employeeListGrp">
          {props.dbData.map((element, index) => (
            <div className="employeeItem" key={index}>
              <p className="staffName">{element.employeeName}</p>

              <p className=" text-xs">Email : {element.employeeEmail}</p>

              <p className="staffData">Department : {element.department}</p>

              <p className="staffData">Role : {element.role}</p>

              <p className="staffData">
                Salary : {element.employeeSalary.toLocaleString()}
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
      </div>

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
