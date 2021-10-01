import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

export default function SalaryScatterChartCustomTooltip(props) {
  if (!props.active) {
    return null;
  }
  const newPayload = [
    {
      name: "Employee",
      // all your data which created the tooltip is located in the .payload property
      value: props.payload[0].payload.name,
      // you can also add "unit" here if you need it
    },
    {
      name: "Job Title",
      // all your data which created the tooltip is located in the .payload property
      value: props.payload[0].payload.jobTitle,
      // you can also add "unit" here if you need it
    },
    ...props.payload,
  ];

  // we render the default, but with our overridden payload
  return <DefaultTooltipContent {...props} payload={newPayload} />;
}
