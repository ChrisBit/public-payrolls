import React from "react";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { getStyledAgencyShortName } from "../utils/agency-utils";
import { formatCurrency } from "../utils/utils";

export default function AgenciesTable({ agencies, title = "Agencies" }) {
  const data = agencies.map(
    ({ id, name, employeeCount, topPay, medianPay, totalPay, year }) => [
      id,
      name,
      employeeCount,
      topPay,
      medianPay,
      totalPay,
      year,
    ]
  );

  const router = useRouter();

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={[
        { name: "id", label: "ID", options: { display: false } },
        { name: "name", label: "Agency" },
        {
          name: "employeeCount",
          label: "Employees",
        },
        {
          name: "topPay",
          label: "Top Pay",
          options: {
            sortDirection: "desc",
            customBodyRenderLite: (dataIndex) => {
              let val = agencies[dataIndex].topPay;
              return formatCurrency(val);
            },
          },
        },
        {
          name: "medianPay",
          label: "Median Pay",
          options: {
            customBodyRenderLite: (dataIndex) => {
              let val = agencies[dataIndex].medianPay;
              return formatCurrency(val);
            },
          },
        },
        {
          name: "totalPay",
          label: "Total Pay",
          options: {
            customBodyRenderLite: (dataIndex) => {
              let val = agencies[dataIndex].totalPay;
              return formatCurrency(val);
            },
          },
        },
        {
          name: "year",
          label: "Year",
        },
      ]}
      options={{
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        selectableRows: "none",
        onRowClick: (rowData) =>
          router.push(
            `/agencies/${rowData[0]}/${getStyledAgencyShortName(rowData[1])}`
          ),
      }}
    />
  );
}
