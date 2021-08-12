import React from "react";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { getStyledAgencyShortName } from "./agency-utils";
import { formatCurrency } from "../utils";

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
          type: "numeric",
        },
        {
          name: "topPay",
          label: "Top Pay",
          defaultSort: "desc",
          type: "currency",
        },
        { name: "medianPay", label: "Median Pay", type: "currency" },
        { name: "totalPay", label: "Total Pay", type: "currency" },
        {
          name: "year",
          label: "Year",
          align: "right",
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
