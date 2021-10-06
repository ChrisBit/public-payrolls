import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  infoCard: {
    height: 400,
    minWidth: 275,
    marginTop: 20,
    marginLeft: 20,
    paddingLeft: 16,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  graph: { height: 400, margin: 20, backgroundColor: "#f0f0f0" },
  table: {
    height: 400,
    width: "100%",
    backgroundColor: "#f0f0f0",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default function DetailPageSkeleton() {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Grid container>
          <Grid item lg={3} sm={12}>
            <Paper className={classes.infoCard} />
          </Grid>
          <Grid item lg={9} sm={12}>
            <Paper className={classes.graph} />
          </Grid>
          <Grid item sm={12}>
            <Paper className={classes.table} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
