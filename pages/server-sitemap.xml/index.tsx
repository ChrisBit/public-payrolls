import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import {
  getAgenciesByName,
  getEmployeesByName,
} from "../../api/public-payroll-api";
import { getStyledAgencyShortName } from "../../utils/agency-utils";
import { getStyledEarnerShortName } from "../../utils/earner-utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [agencies, employees] = await Promise.all([
    getAgenciesByName(),
    getEmployeesByName(),
  ]);

  const agencyUrls = agencies.map(
    ({ id, name }) =>
      `https://salaries.flatwaterfreepress.org/agencies/${id}/${getStyledAgencyShortName(
        name
      )}`
  );
  const employeeUrls = employees.map(
    ({ id, name }) =>
      `https://salaries.flatwaterfreepress.org/earner/${id}/${getStyledEarnerShortName(
        name
      )}`
  );

  const fields = [...agencyUrls, ...employeeUrls].map((url) => {
    return {
      loc: url,
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    };
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
