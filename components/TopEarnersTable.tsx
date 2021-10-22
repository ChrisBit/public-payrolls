import MUIDataTable from "mui-datatables";
import React from "react";
import { getStyledEarnerShortName } from "../utils/earner-utils";
import { formatCurrency } from "../utils/utils";
import { TableLink } from "./TableLink";

export default function TopEarnersTable({ employees, title = "Top Earners" }) {
  return (
    <div style={{ margin: 20 }}>
      <MUIDataTable
        title={title}
        columns={[
          { name: "id", options: { display: false } },
          {
            name: "name",
            label: "Name",
            options: {
              customBodyRender: (value, tableMeta) => {
                const id = tableMeta.rowData[0];
                const link = `/earner/${id}/${getStyledEarnerShortName(value)}`;
                return <TableLink link={link} text={value}></TableLink>;
              },
            },
          },
          { name: "jobTitle", label: "Title" },
          {
            name: "agency",
            label: "Agency",
          },
          {
            name: "totalAnnualAmount",
            label: "Pay",
            options: {
              sortDirection: "desc",
              customBodyRenderLite: (dataIndex) => {
                let val = employees[dataIndex].totalAnnualAmount;
                return formatCurrency(val);
              },
            },
          },
          { name: "year", label: "Year" },
          { name: "originalHireDate", label: "Hire Date" },
        ]}
        data={employees}
        options={{
          download: false,
          filter: false,
          print: false,
          viewColumns: false,
          selectableRows: "none",
        }}
      />
    </div>
  );
}
