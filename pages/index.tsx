import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAgenciesByName,
  getTopEarnersByDepartment,
} from "../api/public-payroll-api";
import MaterialTable from "material-table";
import TopEarnersTable from "./earner/TopEarnersTable";

export default function Home() {
  const router = useRouter();
  const [agencies, setAgencies] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const [agencyResponse, employees] = await Promise.all([
        getAgenciesByName(),
        getTopEarnersByDepartment(),
      ]);
      setAgencies(agencyResponse);
      setEmployees(employees);
    }

    fetchData().then();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="agency-table-container">
        <MaterialTable
          title={"Agencies"}
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
          options={{ pageSize: 10 }}
          // @ts-ignore
          onRowClick={(event, { id }) => {
            event?.preventDefault();
            router.push(`/agencies/${id}`);
          }}
        />
        <TopEarnersTable employees={employees} />
      </div>
    </div>
  );
}
