import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";
import AgencyDetailCard from "../../../components/agency-detail.card";
import TopEarnersTable from "../../../components/TopEarnersTable";
import {
  getAgencyById,
  getAllEarnersByDepartment,
} from "../../../api/public-payroll-api";
import {
  getAgencyNameWithoutNumber,
  getStyledAgencyShortName,
} from "../../../utils/agency-utils";
import SalaryScatterChart from "../../../components/SalaryScatterChart";

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

export interface Agency {
  id: string;
  name: string;
  employeeCount: string;
  topPay: string;
  medianPay: string;
  year: string;
}

export interface AgencyState {
  agency: Agency | null;
  employees;
}

export default function Agency() {
  const router = useRouter();
  const classes = useStyles();
  const { aid } = router.query;
  const [{ agency, employees }, setState] = useState({
    agency: null,
    employees: null,
  } as AgencyState);
  useEffect(() => {
    async function fetchData(agencyId: string) {
      const agencyResponse = await getAgencyById(agencyId);
      const employees = await getAllEarnersByDepartment(agencyResponse.name);
      setState({ agency: agencyResponse, employees });
    }
    if (typeof aid === "string") {
      fetchData(aid).then();
    }
  }, [aid]);

  return agency && employees ? (
    <div>
      <Head>
        <title>{getAgencyNameWithoutNumber(agency.name)}</title>
        <meta
          name="description"
          content={`Nebraska public employee pay information for ${getStyledAgencyShortName(
            agency.name
          )}`}
        />
        <meta
          property="og:title"
          content={getStyledAgencyShortName(agency.name)}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`Nebraska public employee pay information for ${getStyledAgencyShortName(
            agency.name
          )}`}
          key="ogdesc"
        />
        {agency && (
          <link
            rel="canonical"
            href={`${router.asPath}/${getStyledAgencyShortName(agency.name)}`}
          />
        )}
      </Head>
      <div className={classes.title}>
        <Typography variant={"h3"} component={"h1"}>
          {getAgencyNameWithoutNumber(agency.name)}
        </Typography>
      </div>
      <div className={classes.columns}>
        <SalaryScatterChart employeeList={employees} />
        <AgencyDetailCard agency={agency} />
      </div>
      <TopEarnersTable employees={employees} />
    </div>
  ) : (
    <CircularProgress />
  );
}
