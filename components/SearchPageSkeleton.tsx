import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  table: {
    height: 400,
    width: "100%",
    backgroundColor: "#f0f0f0",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default function SearchPageSkeleton() {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Grid container>
          <Grid item sm={12}>
            <Skeleton className={classes.table} />
          </Grid>
          <Grid item sm={12}>
            <Skeleton className={classes.table} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
