import React, { useEffect, useState } from "react";
import {
  getAllEarnersByDepartment,
  getEarnerById,
} from "../../../api/public-payroll-api";
import { useRouter } from "next/router";
import { Grid, makeStyles } from "@material-ui/core";
import Head from "next/head";
import EarnerDetailCard from "../../../components/earner-detail.card";
import { getStyledEarnerShortName } from "../../../utils/earner-utils";
import TopEarnersTable from "../../../components/TopEarnersTable";
import { getAgencyNameWithoutNumber } from "../../../utils/agency-utils";
import SalaryScatterChart from "../../../components/SalaryScatterChart";
import DetailPageSkeleton from "../../../components/DetailPageSkeleton";

const useStyles = makeStyles({
  root: {},
  title: {
    minWidth: 275,
    color: "black",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "20px",
  },
});

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
  const classes = useStyles();
  const { eid } = router.query;
  const [employee, setEmployee] = useState(null as NullableEmployee);
  const [agencyEmployees, setAgencyEmployees] = useState(
    [] as Array<NullableEmployee>
  );
  const filteredAgencyEmployees = agencyEmployees.filter(
    (employeeData) => employeeData?.name != employee?.name
  );
  useEffect(() => {
    async function fetchData(employeeId: string) {
      const employeeResponse: Employee = await getEarnerById(employeeId);
      const agencyEmployeesResponse: NullableEmployee[] =
        await getAllEarnersByDepartment(employeeResponse.agency);
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
          content={`Nebraska public pay information for ${employee.name}`}
        />
        <meta
          property="og:title"
          content={getStyledEarnerShortName(employee.name)}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`Nebraska public pay information for ${employee.name}`}
          key="ogdesc"
        />
        {employee && (
          <link
            rel="canonical"
            href={`${router.asPath}/${getStyledEarnerShortName(employee.name)}`}
          />
        )}
      </Head>
      <div className={classes.columns}>
        <Grid container>
          <Grid item lg={3} sm={12}>
            <EarnerDetailCard employee={employee} />
          </Grid>
          <Grid item lg={9} sm={12}>
            <SalaryScatterChart
              employeeList={filteredAgencyEmployees}
              highlightedEmployee={employee}
            />
          </Grid>
        </Grid>
      </div>
      <TopEarnersTable
        title={`More employees from ${getAgencyNameWithoutNumber(
          employee.agency
        )}`}
        employees={agencyEmployees}
      />
    </div>
  ) : (
    <DetailPageSkeleton />
  );
}
