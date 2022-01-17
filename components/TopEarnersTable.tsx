import React from "react";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { getStyledEarnerShortName } from "../utils/earner-utils";
import { formatCurrency } from "../utils/utils";
import { getStyledAgencyShortName } from "../utils/agency-utils";

export default function TopEarnersTable({ employees, title = "Top Earners" }) {
  const router = useRouter();
  return (
    <div style={{ margin: 20 }}>
      <MUIDataTable
        title={title}
        columns={[
          { name: "id", options: { display: false } },
          { name: "name", label: "Name" },
          { name: "jobTitle", label: "Title" },
          { name: "agency", label: "Agency" },
          {
            name: "salary",
            label: "Salary",
            options: {
              sortDirection: "desc",
              customBodyRenderLite: (dataIndex) => {
                let val = employees[dataIndex].salary;
                return formatCurrency(val);
              },
            },
          },
          {
            name: "overtime",
            label: "Overtime",
            options: {
              sortDirection: "desc",
              customBodyRenderLite: (dataIndex) => {
                let val = employees[dataIndex].overtime;
                return formatCurrency(val);
              },
            },
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
          onRowClick: (rowData) => {
            console.log(rowData);
            router.push(
              `/earner/${rowData[0]}/${getStyledAgencyShortName(rowData[1])}`
            );
          },
        }}
        // @ts-ignore
        onRowClick={(event, { id, name }) => {
          event?.preventDefault();
          router.push(`/earner/${id}/${getStyledEarnerShortName(name)}`);
        }}
      />
    </div>
  );
}
