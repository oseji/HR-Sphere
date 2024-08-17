import { ChangeEvent, useState } from "react";

import print from "../assets/print.svg";
import download from "../assets/download.svg";
import filterIcon from "../assets/filter.svg";
import avatar from "../assets/arlene.png";

import { dataType } from "./App";
type payrollProps = {
  dbData: dataType;
};

const Payroll = (props: payrollProps) => {
  const [departmentFilter, setDepartmentFilter] = useState<string>();
  const [contractFilter, setContractFilter] = useState<string>();

  const listOfDepartments = [
    ...new Set(props.dbData.map((item) => item.department.toLowerCase())),
  ];
  const listOfContracts = [
    ...new Set(
      props.dbData.map((item) => item.employmentContract.toLowerCase())
    ),
  ];

  return (
    <section className="screenSection w-full">
      <div className=" overflow-x-scroll lg:overflow-x-hidden">
        <div className="payrollTable min-h-screen min-w-[700px] lg:min-w-0">
          <div className="pb-2 border-b border-slate-300 flex flex-row justify-between items-center">
            <select className="cursor-pointer outline-0 p-2  rounded capitalize text-base text-black dark:text-white border-none">
              <option value="">Payroll for february 2024</option>
              <option value="">Payroll for january 2024</option>
              <option value="">Payroll for december 2023</option>
            </select>

            <div className="flex flex-row items-center gap-5 text-xs">
              <div className="headingGrp">
                <img src={print} alt="print icon" className="headindIcon" />
                <p className="headingIconText">Print</p>
              </div>

              <div className="headingGrp">
                <img
                  src={download}
                  alt="download icon"
                  className="headindIcon"
                />
                <p className="headingIconText">Download</p>
              </div>

              <button className="text-white px-3 py-1.5 rounded bg-buttonGreen dark:bg-[#A9F2F6] dark:text-black">
                Add Payroll
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 p-3">
            {/* contract type */}
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setContractFilter(e.currentTarget.value)
              }
            >
              <option value="">all employees</option>

              {listOfContracts.map((element, index) => (
                <option value={element.toLowerCase()} key={index}>
                  {element}
                </option>
              ))}
            </select>

            {/* departments */}
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setDepartmentFilter(e.currentTarget.value)
              }
            >
              <option value="">all departments</option>

              {listOfDepartments.map((element, index) => (
                <option value={element.toLowerCase()} key={index}>
                  {element}
                </option>
              ))}
            </select>

            <img
              src={filterIcon}
              alt="filter icon"
              className="p-2 border border-slate-300 rounded-md "
            />
          </div>

          <table className="text-xs w-full">
            <thead>
              <tr>
                <th>employee</th>
                <th>total salary</th>
                <th>gross salary</th>
                <th>taxes</th>
                <th>net salary</th>
                <th>status</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(props.dbData)
                .filter(
                  (e) =>
                    (!departmentFilter ||
                      e.department.toLowerCase() === departmentFilter) &&
                    (!contractFilter ||
                      e.employmentContract.toLowerCase() === contractFilter)
                )
                .map((value, index) => (
                  <tr key={index}>
                    <td className="employeeName">
                      <img src={avatar} alt="profile image" />
                      <p> {value.employeeName}</p>
                    </td>
                    <td>${value.employeeSalary.toLocaleString()}</td>
                    <td>${value.employeeSalary.toLocaleString()}</td>
                    <td>${value.employeeSalary.toLocaleString()}</td>
                    <td>${value.employeeSalary.toLocaleString()}</td>
                    <td
                    // FIX THIS WHEN YOU HAVE IMPLEMENTED SALARY OBJECT
                    // className={
                    //   value.salaryStatus === "pending"
                    //     ? "text-[#F48B02]"
                    //     : value.salaryStatus === "paid"
                    //     ? "text-[#029202]"
                    //     : value.salaryStatus === "not paid"
                    //     ? "text-[#D00000]"
                    //     : ""
                    // }
                    >
                      {/* {value.salaryStatus} */}
                      pending
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Payroll;
