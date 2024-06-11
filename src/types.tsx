import cameron from "./assets/cameron.png";
import devon from "./assets/devon.png";
import esther from "./assets/esther.png";
import floyd from "./assets/floyd.png";
import jane from "./assets/jane.png";
import marvin from "./assets/marvin.png";
import arlene from "./assets/arlene.png";
import ronald from "./assets/ronald.png";
import jessica from "./assets/jessica.png";
import will from "./assets/will.png";

// TYPES
export type employeeOverviewType = {
  name: string;
  img: string;
  jobTitle: string;
  department: string;
  email: string;
  status: string;
  statusColor: string;
  numberOfKPIs: number;
  KPIScore: number;
  monthlyAvg: number;
  totalSalary: number;
  grossSalary: number;
  taxes: number;
  netSalary: number;
  salaryStatus: string;
  salaryStatusColor: string;
};

export type chartDataType = {
  name: string;
  RetentionRate: number;
  TurnoverRate: number;
};

export type pieChartData = {
  name: string;
  value: number;
};

export type keyIndicatorDataType = {
  month: string;
  val1: number;
  val2: number;
  val3: number;
};

// CONST

export const employeeOverview: { [key: string]: employeeOverviewType } = {
  willJohn: {
    name: "will john",
    img: will,
    jobTitle: "product designer",
    department: "product",
    email: "willjohn@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 8,
    KPIScore: 70,
    monthlyAvg: 72,
    totalSalary: 100000,
    grossSalary: 5000,
    taxes: 370.23,
    netSalary: 5000 - 370.23,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  jessicaReel: {
    name: "jessica reel",
    img: jessica,
    jobTitle: "product manager",
    department: "product",
    email: "jessicaforeel@gmail.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 8,
    KPIScore: 52,
    monthlyAvg: 55,
    totalSalary: 120000,
    grossSalary: 7200,
    taxes: 570.13,
    netSalary: 7200 - 570.13,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  ronaldRichard: {
    name: "ronald richard",
    img: ronald,
    jobTitle: "front-end engineer",
    department: "engineering",
    email: "ronrich@yahoo.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 14,
    KPIScore: 74,
    monthlyAvg: 78,
    totalSalary: 90000,
    grossSalary: 4100,
    taxes: 290.93,
    netSalary: 4100 - 290.93,
    salaryStatus: "pending",
    salaryStatusColor: "text-[#EF5F04]",
  },
  estherHoward: {
    name: "esther howard",
    img: esther,
    jobTitle: "back-end engineer",
    department: "engineering",
    email: "estward@gmail.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 14,
    KPIScore: 72,
    monthlyAvg: 75,
    totalSalary: 110000,
    grossSalary: 5500,
    taxes: 400.93,
    netSalary: 5500 - 400.93,
    salaryStatus: "not paid",
    salaryStatusColor: "text-[#EF5F04]",
  },
  arleneMccoy: {
    name: "arlene mccoy",
    img: arlene,
    jobTitle: "fullstack engineer",
    department: "engineering",
    email: "mcarlene@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 1,
    KPIScore: 20,
    monthlyAvg: 21,
    totalSalary: 115000,
    grossSalary: 5250,
    taxes: 400.67,
    netSalary: 5259 - 400.67,
    salaryStatus: "pending",
    salaryStatusColor: "text-[#047E04]",
  },
  floydMiles: {
    name: "floyd miles",
    img: floyd,
    jobTitle: "fullstack engineer",
    department: "engineering",
    email: "floydmi@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 9,
    KPIScore: 59,
    monthlyAvg: 66,
    totalSalary: 130000,
    grossSalary: 7150,
    taxes: 573.72,
    netSalary: 7150 - 573.72,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  janeCooper: {
    name: "jane cooper",
    img: jane,
    jobTitle: "product manager",
    department: "product",
    email: "jacoop@outlook.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 4,
    KPIScore: 66,
    monthlyAvg: 69,
    totalSalary: 100000,
    grossSalary: 5200,
    taxes: 347.67,
    netSalary: 5200 - 347.67,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  marvinMckinney: {
    name: "marvin mcckinney",
    img: marvin,
    jobTitle: "front-end engineer",
    department: "engineering",
    email: "willjohn@gmail.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 10,
    KPIScore: 40,
    monthlyAvg: 45,
    totalSalary: 95000,
    grossSalary: 4500,
    taxes: 299.08,
    netSalary: 4500 - 299.08,
    salaryStatus: "not paid",
    salaryStatusColor: "text-[#EF5F04]",
  },
  cameronWilliamson: {
    name: "cameron williamson",
    img: cameron,
    jobTitle: "HR",
    department: "human resources",
    email: "cameronwilliamson@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 9,
    KPIScore: 57,
    monthlyAvg: 61,
    totalSalary: 105000,
    grossSalary: 5750,
    taxes: 675.58,
    netSalary: 5750 - 675.58,
    salaryStatus: "pending",
    salaryStatusColor: "text-[#EF5F04]",
  },
  devonLane: {
    name: "devon lane",
    img: devon,
    jobTitle: "devOps engineer",
    department: "engineering",
    email: "devonLane@yahoo.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 11,
    KPIScore: 60,
    monthlyAvg: 65,
    totalSalary: 135000,
    grossSalary: 7900,
    taxes: 611.18,
    netSalary: 7900 - 611.18,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  averyJackson: {
    name: "avery jackson",
    img: cameron,
    jobTitle: "product designer",
    department: "product",
    email: "averyjackson@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 8,
    KPIScore: 70,
    monthlyAvg: 68,
    totalSalary: 115000,
    grossSalary: 9600,
    taxes: 700.5,
    netSalary: 9600 - 700.5,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  taylorMoore: {
    name: "taylor moore",
    img: arlene,
    jobTitle: "back-end engineer",
    department: "engineering",
    email: "taylormoore@yahoo.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 10,
    KPIScore: 50,
    monthlyAvg: 55,
    totalSalary: 98000,
    grossSalary: 8200,
    taxes: 650.25,
    netSalary: 8200 - 650.25,
    salaryStatus: "not paid",
    salaryStatusColor: "text-[#EF5F04]",
  },
  jordanSmith: {
    name: "jordan smith",
    img: marvin,
    jobTitle: "HR",
    department: "human resources",
    email: "jordansmith@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 12,
    KPIScore: 65,
    monthlyAvg: 60,
    totalSalary: 90000,
    grossSalary: 7500,
    taxes: 500.1,
    netSalary: 7500 - 500.1,
    salaryStatus: "pending",
    salaryStatusColor: "text-[#EF5F04]",
  },
  caseyLee: {
    name: "casey lee",
    img: esther,
    jobTitle: "fullstack engineer",
    department: "engineering",
    email: "caseylee@yahoo.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 9,
    KPIScore: 58,
    monthlyAvg: 62,
    totalSalary: 122000,
    grossSalary: 10100,
    taxes: 755.65,
    netSalary: 10100 - 755.65,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  alexReed: {
    name: "alex reed",
    img: cameron,
    jobTitle: "devOps engineer",
    department: "engineering",
    email: "alexreed@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 11,
    KPIScore: 72,
    monthlyAvg: 70,
    totalSalary: 140000,
    grossSalary: 11600,
    taxes: 900.3,
    netSalary: 11600 - 900.3,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  rileyBrown: {
    name: "riley brown",
    img: jane,
    jobTitle: "front-end engineer",
    department: "engineering",
    email: "rileybrown@gmail.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 10,
    KPIScore: 55,
    monthlyAvg: 50,
    totalSalary: 100000,
    grossSalary: 8300,
    taxes: 589.75,
    netSalary: 8300 - 589.75,
    salaryStatus: "not paid",
    salaryStatusColor: "text-[#EF5F04]",
  },
  quinnPatel: {
    name: "quinn patel",
    img: ronald,
    jobTitle: "devOps engineer",
    department: "engineering",
    email: "quinnpatel@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 10,
    KPIScore: 67,
    monthlyAvg: 72,
    totalSalary: 150000,
    grossSalary: 12500,
    taxes: 950.5,
    netSalary: 12500 - 950.5,
    salaryStatus: "paid",
    salaryStatusColor: "text-[#047E04]",
  },
  morganCarter: {
    name: "morgan carter",
    img: devon,
    jobTitle: "back-end engineer",
    department: "engineering",
    email: "morgancarter@gmail.com",
    status: "remote",
    statusColor: "text-[#EF5F04]",
    numberOfKPIs: 11,
    KPIScore: 62,
    monthlyAvg: 65,
    totalSalary: 130000,
    grossSalary: 10800,
    taxes: 800.45,
    netSalary: 10800 - 800.45,
    salaryStatus: "not paid",
    salaryStatusColor: "text-[#EF5F04]",
  },
  kellyMurphy: {
    name: "kelly murphy",
    img: jessica,
    jobTitle: "HR",
    department: "human resources",
    email: "kellymurphy@gmail.com",
    status: "on site",
    statusColor: "text-[#047E04]",
    numberOfKPIs: 10,
    KPIScore: 59,
    monthlyAvg: 58,
    totalSalary: 95000,
    grossSalary: 7900,
    taxes: 600.25,
    netSalary: 7900 - 600.25,
    salaryStatus: "pending",
    salaryStatusColor: "text-[#EF5F04]",
  },
};

export const chartData: chartDataType[] = [
  {
    name: "2020",
    RetentionRate: 75,
    TurnoverRate: 20,
  },
  {
    name: "2021",
    RetentionRate: 45,
    TurnoverRate: 55,
  },
  {
    name: "2022",
    RetentionRate: 35,
    TurnoverRate: 65,
  },
  {
    name: "2023",
    RetentionRate: 40,
    TurnoverRate: 60,
  },
  {
    name: "2024",
    RetentionRate: 20,
    TurnoverRate: 80,
  },
];

export const data: pieChartData[] = [
  { name: "contractStaff", value: 127 },
  { name: "fulltimeStaff", value: 273 },
];

export const efficiencyData: pieChartData[] = [
  { name: "efficient", value: 80 },
  { name: "notEfficient", value: 20 },
];

export const keyIndicator: keyIndicatorDataType[] = [
  {
    month: "Jan",
    val1: 100,
    val2: 75,
    val3: 25,
  },
  {
    month: "Feb",
    val1: 85,
    val2: 66,
    val3: 72,
  },
  {
    month: "Mar",
    val1: 95,
    val2: 53,
    val3: 44,
  },
  {
    month: "Apr",
    val1: 29,
    val2: 63,
    val3: 95,
  },
  {
    month: "May",
    val1: 60,
    val2: 96,
    val3: 28,
  },
  {
    month: "Jun",
    val1: 84,
    val2: 39,
    val3: 49,
  },
];
