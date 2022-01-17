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
import { Card } from "@material-ui/core";
import SalaryScatterChartCustomTooltip from "./SalaryScatterChartCustomTooltip";

export default function SalaryScatterChart({
  employeeList,
  highlightedEmployee,
}) {
  const now = moment();
  const data = employeeList.map((employee) => ({
    name: employee.name,
    jobTitle: employee.jobTitle,
    salary: employee.salary,
    overtime: employee.overtime,
    x: employee.totalAnnualAmount,
    y: now.diff(moment(employee.originalHireDate), "years"),
  }));
  const highlightedData = {
    name: highlightedEmployee?.name,
    jobTitle: highlightedEmployee?.jobTitle,
    salary: highlightedEmployee?.salary,
    overtime: highlightedEmployee?.overtime,
    x: highlightedEmployee?.totalAnnualAmount,
    y: highlightedEmployee
      ? now.diff(moment(highlightedEmployee.originalHireDate), "years")
      : 0,
  };
  return (
    <Card style={{ marginTop: "20px" }}>
      <ResponsiveContainer height={400} width="95%" minWidth="375px">
        <ScatterChart
          height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="Total Pay"
            tickFormatter={formatCurrency}
          >
            <Label value="Total Pay" offset={0} position="bottom" />
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
              name === "Total Pay" || name === "Salary" || name === "Overtime"
                ? formatCurrency(value)
                : value
            }
            labelFormatter={() => ""}
            content={<SalaryScatterChartCustomTooltip />}
          />
          <Scatter name="all employees" data={data} fill="#8884d8" />
          {highlightedEmployee && (
            <Scatter
              name="highlighted employee"
              data={[highlightedData]}
              fill="#b81010"
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
}
