import Stats from "./Stats";
import Schedule from "./Schedule";

const Overview = () => {
  return (
    <section className="overviewScreen">
      <div className="overviewSection">
        <Stats></Stats>
        <Schedule></Schedule>
      </div>
    </section>
  );
};

export default Overview;
