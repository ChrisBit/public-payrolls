import React, { useEffect, useState } from "react";
import {
  getAgencyById,
  getTopEarnersByDepartment,
} from "../../api/public-payroll-api";
import { useRouter } from "next/router";
import AgencyDetailCard from "./agency-detail.card";
import TopEarnersTable from "../earner/TopEarnersTable";
import { CircularProgress } from "@material-ui/core";

export default function Agency() {
  const router = useRouter();
  const { aid } = router.query;
  const [{ agency, employees }, setState] = useState({
    agency: null,
    employees: null,
  });
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
      <AgencyDetailCard agency={agency} />
      <TopEarnersTable employees={employees} />
    </div>
  ) : (
    <CircularProgress />
  );
}
