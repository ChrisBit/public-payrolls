import MaterialTable from "material-table";
import React from "react";
import { useRouter } from "next/router";

export default function AgenciesTable({
  agencies,
  title = "Agencies",
  options = {},
}) {
  const router = useRouter();
  return (
    <MaterialTable
      title={title}
      columns={[
        { field: "id", title: "id", hidden: true },
        { field: "name", title: "Agency" },
        {
          field: "employeeCount",
          title: "Employees",
          type: "numeric",
        },
        {
          field: "topPay",
          title: "Top Pay",
          defaultSort: "desc",
          type: "currency",
        },
        { field: "medianPay", title: "Median Pay", type: "currency" },
        {
          field: "year",
          title: "Year",
          align: "right",
        },
      ]}
      data={agencies}
      options={{ pageSize: 10, ...options }}
      // @ts-ignore
      onRowClick={(event, { id }) => {
        event?.preventDefault();
        router.push(`/agencies/${id}`);
      }}
    />
  );
}
