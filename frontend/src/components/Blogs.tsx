import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

type Props = {
  title: string;
  content: string;
};

const blogStyle = {
  padding: "2rem",
  margin: "2rem 8rem",
};

const Blogs = (props: Props) => {
  return (
    <Paper sx={blogStyle}>
      <Typography variant="h3" component="h2">
        {props.title}
      </Typography>
      <Typography mt={2} variant="overline" display="block" gutterBottom>
        {props.content}
      </Typography>
    </Paper>
  );
};

export default Blogs;
