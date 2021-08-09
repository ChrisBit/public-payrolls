import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {CardActions, CardHeader, Link} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#f0f0f0'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AgencyDetailCard({ agency }) {
  const { employeeCount, name, topPay, medianPay} = agency;
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <CardHeader
            title={`About ${name}`}
            subheader={`Serving ${employeeCount} people in Nebraska`}
          />
          <Typography variant="body2" component="p">
            Total Payroll: TBD
            <hr/>
            Top Pay: ${topPay}
            <hr/>
            Median Pay: ${medianPay}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={'#'} variant={'body2'}>
            Agency Website
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
