module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PAYROLL_API_BASE_URL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/search*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_PAYROLL_API_BASE_URL}/server-sitemap.xml`,
    ],
  },
};
