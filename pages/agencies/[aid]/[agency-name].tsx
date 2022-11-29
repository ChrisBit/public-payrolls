import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Head from "next/head";
import AgencyDetailCard from "../../../components/agency-detail.card";
import TopEarnersTable from "../../../components/TopEarnersTable";
import {
  getAgencyById,
  getAllEarnersByDepartment, getNotes,
} from "../../../api/public-payroll-api";
import {
  getAgencyNameWithoutNumber,
  getStyledAgencyShortName,
} from "../../../utils/agency-utils";
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

export interface Agency {
  organization: string;
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
  note;
}

export default function Agency() {
  const router = useRouter();
  const classes = useStyles();
  const { aid } = router.query;
  const [{ agency, employees, note }, setState] = useState({
    agency: null,
    employees: null,
    note: null
  } as AgencyState);
  useEffect(() => {
    async function fetchData(agencyId: string) {
      const agencyResponse = await getAgencyById(agencyId);
      const employees = await getAllEarnersByDepartment(agencyResponse.name);
      const notes = await getNotes();
      let note = notes.filter(note => note.organization === employees[0]?.organization);
      note = note.length ? note[0] : '';
      setState({ agency: agencyResponse, employees, note });
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
          {`${getAgencyNameWithoutNumber(agency.name)} (${agency.organization})`}
        </Typography>
      </div>
      <div className={classes.columns}>
        <Grid container>
          <Grid item lg={3} sm={12}>
            <AgencyDetailCard agency={agency} note={note} />
          </Grid>
          <Grid item lg={9} sm={12}>
            <SalaryScatterChart
              employeeList={employees}
              highlightedEmployee={undefined}
            />
          </Grid>
        </Grid>
      </div>
      <TopEarnersTable employees={employees} />
    </div>
  ) : (
    <DetailPageSkeleton />
  );
}
