import React, { useEffect, useState } from "react";
import {
  getEarnerById,
  getTopEarnersByDepartment,
} from "../../../api/public-payroll-api";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
import EarnerDetailCard from "../../../components/earner-detail.card";
import { getStyledEarnerShortName } from "../../../utils/earner-utils";
import TopEarnersTable from "../../../components/TopEarnersTable";
import { getAgencyNameWithoutNumber } from "../../../utils/agency-utils";

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
  const [agencyEmployees, setAgencyEmployees] = useState(
    [] as Array<NullableEmployee>
  );
  useEffect(() => {
    async function fetchData(employeeId: string) {
      const employeeResponse: Employee = await getEarnerById(employeeId);
      const agencyEmployeesResponse: NullableEmployee[] =
        await getTopEarnersByDepartment(employeeResponse.agency);
      setEmployee(employeeResponse);
      setAgencyEmployees(agencyEmployeesResponse);
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
        <meta
          property="og:title"
          content={getStyledEarnerShortName(employee.name)}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`Public pay information for ${employee.name}`}
          key="ogdesc"
        />
        {employee && (
          <link
            rel="canonical"
            href={`${router.asPath}/${getStyledEarnerShortName(employee.name)}`}
          />
        )}
      </Head>
      <EarnerDetailCard employee={employee} />
      <TopEarnersTable
        title={`More employees from ${getAgencyNameWithoutNumber(
          employee.agency
        )}`}
        employees={agencyEmployees}
      />
    </div>
  ) : (
    <CircularProgress />
  );
}
