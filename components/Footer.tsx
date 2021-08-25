import React from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footerItem: {
    textAlign: "center",
  },
  logo: {
    width: 175,
    padding: 15,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar>
          <div style={{ width: "100%" }}>
            <Grid container>
              <Grid item sm={12} lg={4} className={classes.footerItem}>
                <Link href="https://flatwaterfreepress.org/">
                  <img className={classes.logo} src="/flatwater-logo.jpeg" />
                </Link>
              </Grid>
              <Grid item sm={12} lg={4} className={classes.footerItem}>
                <Link href="https://www.codefornebraska.org">
                  <img
                    className={classes.logo}
                    src="/code-for-nebraska-logo.jpeg"
                  />
                </Link>
              </Grid>
              <Grid item sm={12} lg={4} className={classes.footerItem}>
                <Link href="https://platteinstitute.org/">
                  <img className={classes.logo} src="/platte-logo.svg" />
                </Link>
              </Grid>
              <Grid item sm={12} className={classes.footerItem}>
                <Typography>
                  © {new Date().getFullYear()} Code for Nebraska
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
