import { employeeOverview } from "./types";

import print from "./assets/print.svg";
import download from "./assets/download.svg";
import filterIcon from "./assets/filter.svg";

const Payroll = () => {
  return (
    <section className="screenSection w-full">
      <div className="payrollTable">
        <div className="pb-2 border-b border-slate-300 flex flex-row justify-between items-center">
          <select className="cursor-pointer outline-0 p-2  rounded capitalize text-base text-black border-none">
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
              <img src={download} alt="download icon" className="headindIcon" />
              <p className="headingIconText">Download</p>
            </div>

            <button className="text-white px-3 py-1.5 rounded bg-[#095256]">
              Add Payroll
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 p-3">
          <select>
            <option value="qtr1 2024">all employees</option>
            <option value="qtr2 2024">on site</option>
            <option value="qtr3 2024">remote</option>
          </select>

          <select>
            <option value="all departments">all departments</option>
            <option value="engineering">engineering</option>
            <option value="product">product</option>
            <option value="hr">HR</option>
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
            {Object.values(employeeOverview).map((value, index) => (
              <tr key={index}>
                <td className="employeeName">
                  <img src={value.img} alt="profile image" />
                  <p> {value.name}</p>
                </td>
                <td>${value.totalSalary.toLocaleString()}</td>
                <td>${value.grossSalary.toLocaleString()}</td>
                <td>${value.taxes.toLocaleString()}</td>
                <td>${value.netSalary.toLocaleString()}</td>
                <td
                  className={
                    value.salaryStatus === "pending"
                      ? "text-[#F48B02]"
                      : value.salaryStatus === "paid"
                      ? "text-[#029202]"
                      : value.salaryStatus === "not paid"
                      ? "text-[#D00000]"
                      : ""
                  }
                >
                  {value.salaryStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Payroll;
