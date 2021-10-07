import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  getAgenciesByName,
  getTopEarnersByDepartment,
} from "../api/public-payroll-api";
import TopEarnersTable from "../components/TopEarnersTable";
import AgenciesTable from "../components/AgenciesTable";

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
        <title>Nebraska Public Payrolls</title>
        <meta
          name="description"
          content="Public payroll information for Nebraska state employees."
        />
        <meta
          property="og:title"
          content="Nebraska public payrolls"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Public payroll information for Nebraska state employees."
          key="ogdesc"
        />
        <meta property="og:image" content="../public/screenshot.png" />
      </Head>
      <div className="agency-table-container">
        <AgenciesTable agencies={agencies} />
        <TopEarnersTable employees={employees} />
      </div>
    </div>
  );
}
