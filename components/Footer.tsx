import React from "react";
import {
  AppBar,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import flatwaterLogo from "../public/flatwater-logo.jpeg";
import plattLogo from "../public/platte-logo.svg";
import codeForNebLogo from "../public/code-for-nebraska-logo.jpeg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footerItem: {
    textAlign: "center",
  },
  logo: {
    width: 175,
    padding: 15,
  },
  imageContainer: {
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
                <div className={classes.imageContainer}>
                  <Link href="https://flatwaterfreepress.org/">
                    <Image
                      src={flatwaterLogo}
                      alt="Flatwater Free Press logo"
                      width={175}
                      height={109}
                    />
                  </Link>
                </div>
              </Grid>
              <Grid item sm={12} lg={4} className={classes.footerItem}>
                <div className={classes.imageContainer}>
                  <Link href="https://www.codefornebraska.org">
                    <Image
                      src={codeForNebLogo}
                      alt="Code for Nebraska logo"
                      width={175}
                      height={86}
                    />
                  </Link>
                </div>
              </Grid>
              <Grid item sm={12} lg={4} className={classes.footerItem}>
                <div className={classes.imageContainer}>
                  <Link href="https://platteinstitute.org/">
                    <Image src={plattLogo} alt="Platte Institute logo" />
                  </Link>
                </div>
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
