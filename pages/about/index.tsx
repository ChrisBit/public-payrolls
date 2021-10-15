import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "50%",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: ["IBM Plex Sans", "Segoe UI", "Roboto", "Helvetica Neue"].join(
      ","
    ),
  },
  title: { marginBottom: "20px" },
});

export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography component={"h1"} variant={"h3"} className={classes.title}>
        About Us
      </Typography>
      <Typography paragraph>
        This database of compensation for Nebraska state employees is published
        by The Flatwater Free Press, a nonprofit and nonpartisan news
        organization. The acquisition, cleaning, development, hosting and other
        costs were underwritten by the Platte Institute, an Omaha-based think
        tank dedicated to removing barriers for Nebraskans. Code for Nebraska, a
        group of civic coders who act in the public interest, lent their
        considerable talents to make it a reality. We publish this information
        because we are committed to supporting transparency in government, and
        as a resource for the public and journalists throughout the state.
      </Typography>
      <Typography paragraph>
        For democracy to work, the public needs clear, complete, and
        easy-to-understand information about what the government does, how much
        it costs, and easy access to historical records.{" "}
      </Typography>
      <Typography paragraph>
        The initial salaries in this database reflect paid employees of the
        state of Nebraska. The data was provided by the Nebraska Department of
        Administrative Services in June 2021. The state did not provide
        additional requested information, such as overtime costs and other
        components of pay that can boost employees’ take-home pay.
      </Typography>
      <Typography paragraph>
        The Flatwater Free Press, in partnership with the Platte Institute,
        looks forward to growing this resource over time by bringing additional
        public records to light, providing more transparency, openness, and
        accountability in Nebraska government.
      </Typography>
    </div>
  );
}
