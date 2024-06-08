import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from "recharts";

const Performance = () => {
  type pieChartData = {
    name: string;
    value: number;
  };

  const data: pieChartData[] = [
    { name: "contractStaff", value: 127 },
    { name: "fulltimeStaff", value: 273 },
  ];
  const COLORS = ["#06D6A0", "#095256"];

  return (
    <section className="performanceSection screenSection">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="totalEmployeeChart  min-w-[227px]">
            <div className="flex flex-row justify-between items-center text-black font-semibold">
              <h2>Total Employee</h2>
              <h2>400</h2>
            </div>

            <PieChart width={200} height={200} className="mx-auto">
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={7}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <div className="barChartInfo text-[10px] mt-5">
              <div className="flex flex-row items-center gap-2">
                <span className="p-2 rounded bg-[#095256]"></span>
                <div>Contract staff</div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="p-2 rounded bg-[#06D6A0]"></span>
                <div>Full time staff</div>
              </div>
            </div>
          </div>

          <div className="keyIndicatorsChart w-[466px]">
            <div className="flex flex-row items-center justify-between text-black">
              <h2 className="font-semibold">Key Performance Indicators</h2>

              <select className="capitalize">
                <option value="all departments">all departments</option>
                <option value="product">product</option>
                <option value="engineering">engineering</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;
