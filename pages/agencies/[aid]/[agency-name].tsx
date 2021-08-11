import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import Head from "next/head";
import AgencyDetailCard from "../agency-detail.card";
import TopEarnersTable from "../../earner/TopEarnersTable";
import {
  getAgencyById,
  getTopEarnersByDepartment,
} from "../../../api/public-payroll-api";
import { getStyledAgencyShortName } from "../agency-utils";

const useStyles = makeStyles({
  root: {},
  title: {
    minWidth: 275,
    backgroundColor: "#EC7357",
    color: "white",
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
      const employees = await getTopEarnersByDepartment(agencyResponse.name);
      setState({ agency: agencyResponse, employees });
    }
    if (typeof aid === "string") {
      fetchData(aid).then();
    }
  }, [aid]);

  return agency && employees ? (
    <div>
      <Head>
        <title>{getStyledAgencyShortName(agency.name)}</title>
        <meta
          name={agency?.name || "Public Payrolls"}
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
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
          {agency?.name}
        </Typography>
      </div>
      <div className={classes.columns}>
        <div>Salary Distribution will go here</div>
        <AgencyDetailCard agency={agency} />
      </div>

      <TopEarnersTable employees={employees} />
    </div>
  ) : (
    <CircularProgress />
  );
}
