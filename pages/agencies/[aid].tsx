import React, { useEffect, useState } from "react";
import { getAgencyById } from "../../api/public-payroll-api";
import { useRouter } from "next/router";

export default function Agency() {
  const router = useRouter();
  const { aid } = router.query;
  const [agency, setAgency] = useState({});
  useEffect(() => {
    async function fetchData(agencyId: string) {
      const agencyResponse = await getAgencyById(agencyId);
      setAgency(agencyResponse);
    }
    if (typeof aid === "string") {
      fetchData(aid).then();
    }
  });

  return <div>{JSON.stringify(agency)}</div>;
}
