import {
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment";
import { formatCurrency } from "../utils/utils";

export default function SalaryScatterChart({ employeeList }) {
  const now = moment();
  const data = employeeList.map((employee) => ({
    name: employee.jobTitle,
    x: employee.totalAnnualAmount,
    y: now.diff(moment(employee.originalHireDate), "years"),
  }));
  return (
    <ResponsiveContainer height={400} width="95%" minWidth="375px">
      <ScatterChart
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="salary"
          tickFormatter={formatCurrency}
        >
          <Label value="Annual salary" offset={0} position="bottom" />
        </XAxis>
        <YAxis
          type="number"
          dataKey="y"
          name="years"
          label={{
            value: "Years of employment",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name, props) =>
            name === "salary" ? formatCurrency(value) : value
          }
        />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
