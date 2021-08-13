import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  getAgenciesByName,
  getTopEarnersByDepartment,
} from "../api/public-payroll-api";
import TopEarnersTable from "./earner/TopEarnersTable";
import AgenciesTable from "./agencies/AgenciesTable";

export default function Home() {
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
        <title>Public Payrolls</title>
        <meta
          name="description"
          content="Public payroll information for Nebraska state employees."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="agency-table-container">
        <AgenciesTable agencies={agencies} />
        <TopEarnersTable employees={employees} />
      </div>
    </div>
  );
}
