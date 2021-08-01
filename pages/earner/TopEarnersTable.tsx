import MaterialTable from "material-table";
import React from "react";
import { useRouter } from "next/router";

export default function TopEarnersTable({
  employees,
  title = "Top Earners",
  options = { pageSize: 10 },
}) {
  const router = useRouter();
  return (
    <div className="top-earners-container">
      <MaterialTable
        title={title}
        columns={[
          { field: "id", hidden: true },
          { field: "name", title: "Name" },
          { field: "jobTitle", title: "Title" },
          { field: "agency", title: "Agency" },
          { field: "totalAnnualAmount", title: "Pay", type: "currency" },
          { field: "year", title: "Year", type: "numeric" },
          { field: "originalHireDate", title: "Hire Date", align: "right" },
        ]}
        data={employees}
        options={options}
        // @ts-ignore
        onRowClick={(event, { id }) => {
          event?.preventDefault();
          router.push(`/earner/${id}`);
        }}
      />
    </div>
  );
}
