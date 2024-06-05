import calndarIcon from "./assets/calendarIcon.svg";

const Schedule = () => {
  return (
    <section className="bg-white rounded w-full my-3 mx-1.5 p-3 text-sm">
      <div className="calendarHeading">
        <div className="flex flex-row items-center gap-2">
          <img src={calndarIcon} alt="calendar" />
          <p className="text-black font-semibold">Schedule</p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
