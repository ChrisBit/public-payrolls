import { Link, Typography } from "@material-ui/core";

export const TableLink = ({ link, text }) => {
  return (
    <Link href={link}>
      <Typography>{text}</Typography>
    </Link>
  );
};
