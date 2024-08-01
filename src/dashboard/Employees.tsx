import { useState } from "react";
import { db, auth } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { dataType } from "./App";

type getEmployeeData = () => Promise<void>;

type EmployeeProps = {
  getEmployeeData: getEmployeeData;
  dbData: dataType;
};

const Employees = (props: EmployeeProps) => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [workMode, setWorkMode] = useState<string>("");

  const addEmployee = async () => {
    const user = auth.currentUser;
    try {
      if (user) {
        await addDoc(collection(db, `users/${user.email}/employeeData`), {
          employeeName: employeeName,
          department: department,
          jobTitle: jobTitle,
          workMode: workMode,

          userID: auth?.currentUser?.uid,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      props.getEmployeeData();
      setEmployeeName("");
      setDepartment("");
      setJobTitle("");
      setWorkMode("");
    }
  };
  return (
    <section className="screenSection w-full flex flex-col lg:flex-row lg:justify-between gap-3 text-sm">
      <div className="employeeList w-full lg:w-2/3">
        <div className="flex flex-row items-center justify-between">
          <h1 className="boxHeading">Employees</h1>

          <select>
            <option value="all">all</option>
            <option value="all">remote</option>
            <option value="all">on site</option>
          </select>
        </div>

        <div className="employeeListGrp">
          {props.dbData.map((element, index) => (
            <div className="employeeItem" key={index}>
              <p className="staffName">{element.employeeName}</p>
              <p className="staffData">Department : {element.department}</p>
              <p className="staffData">Job Title : {element.jobTitle}</p>
              <p className="staffData">Work Mode : {element.workMode}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="addEmployeeForm w-full lg:w-1/3">
        <h1 className="boxHeading">Add new employee</h1>

        <form className="employeeDataForm">
          <div className="employeeDataInput">
            <label htmlFor="employeeName">Name</label>
            <input
              type="text"
              id="employeeName"
              placeholder="Enter name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div className="employeeDataInput">
            <label htmlFor="employeeDepartment">Department</label>
            <input
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
              type="text"
              id="employeeJobTitle"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="employeeDataInput">
            <label htmlFor="employeeWorkMode">Work mode</label>
            <input
              type="text"
              id="employeeWorkMode"
              placeholder="Enter work mode"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            />
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
