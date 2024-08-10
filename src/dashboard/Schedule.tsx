import { useState } from "react";
import { Calendar } from "../components/ui/calendar";

import calndarIcon from "../assets/calendarIcon.svg";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="bg-white dark:bg-[#0F0F0F] rounded max-w-full mx-3 lg:mx-0 my-3 p-3 text-sm">
      <div className="calendarHeading">
        <div className="flex flex-row items-center gap-2">
          <img src={calndarIcon} alt="calendar" />
          <p className="boxHeading">Schedule</p>
        </div>

        <button className="text-white px-3 py-1.5 bg-buttonGreen rounded-lg dark:bg-[#A9F2F6] dark:text-black">
          + New
        </button>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border "
      />
    </section>
  );
};

export default Schedule;
