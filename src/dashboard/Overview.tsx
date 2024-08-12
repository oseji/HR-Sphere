import Stats from "./Stats";
import Schedule from "./Schedule";

import { dataType } from "./App";

type overviewProps = {
  dbData: dataType;
};

const Overview = (props: overviewProps) => {
  return (
    <section className="overviewScreen">
      <div className="overviewSection">
        <Stats dbData={props.dbData}></Stats>
        <Schedule></Schedule>
      </div>
    </section>
  );
};

export default Overview;
