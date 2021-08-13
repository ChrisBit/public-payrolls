import React, { useEffect, useState } from "react";
import { getEarnerById } from "../../../api/public-payroll-api";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
import EarnerDetailCard from "./../earner-detail.card";
import { getStyledEarnerShortName } from "../earner-utils";

export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  agency: string;
  totalAnnualAmount: string;
  year: string;
  originalHireDate: string;
}

export type NullableEmployee = Employee | null;

export default function Earner() {
  const router = useRouter();
  const { eid } = router.query;
  const [employee, setEmployee] = useState(null as NullableEmployee);
  useEffect(() => {
    async function fetchData(employeeId: string) {
      const employeeResponse: Employee = await getEarnerById(employeeId);
      setEmployee(employeeResponse);
    }
    if (typeof eid === "string") {
      fetchData(eid).then();
    }
  }, [eid]);

  return employee ? (
    <div>
      <Head>
        <title>{getStyledEarnerShortName(employee.name)}</title>
        <meta
          name="description"
          content={`Public pay information for ${employee.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {employee && (
          <link
            rel="canonical"
            href={`${router.asPath}/${getStyledEarnerShortName(employee.name)}`}
          />
        )}
      </Head>
      <EarnerDetailCard employee={employee} />
    </div>
  ) : (
    <CircularProgress />
  );
}
