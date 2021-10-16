module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  generateRobotsTxt: true,
  exclude: ["/search*", "/about"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://salaries.flatwaterfreepress.org/server-sitemap.xml`,
    ],
  },
};
