module.exports = {
  siteUrl: "https://salaries.flatwaterfreepress.org",
  generateRobotsTxt: true,
  exclude: ["/search*", "/about"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://salaries.flatwaterfreepress.org/server-sitemap.xml`,
    ],
  },
};
