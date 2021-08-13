import React from "react";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { getStyledAgencyShortName } from "./agency-utils";
import { currencySort, formatCurrency } from "../utils";

export default function AgenciesTable({ agencies, title = "Agencies" }) {
  const data = agencies.map(
    ({ id, name, employeeCount, topPay, medianPay, totalPay, year }) => [
      id,
      name,
      employeeCount,
      formatCurrency(topPay),
      formatCurrency(medianPay),
      formatCurrency(totalPay),
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
            sortCompare: currencySort,
          },
        },
        {
          name: "medianPay",
          label: "Median Pay",
          options: { sortCompare: currencySort },
        },
        {
          name: "totalPay",
          label: "Total Pay",
          options: { sortCompare: currencySort },
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
