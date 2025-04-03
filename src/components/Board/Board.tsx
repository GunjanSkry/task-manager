import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CreateTask from "../CreateTask/CreateTask";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#205781",
  ...theme.typography.body2,
  padding: "0.5rem 0.5rem 0",
  textAlign: "center",
  color: theme.palette.text.primary,
  width: "100%",
  borderRadius: "1rem 1rem 1rem 1rem",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Board: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 10, md: 5 }}>
          <Item>
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#FFF", fontWeight: "bold" }}
              >
                <span style={{ fontSize: "1.5rem" }}>📝</span> Tasks To Do
              </Typography>
            </Box>
            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{
                borderRadius: "1rem 1rem 0.75rem 0.75rem",
                backgroundColor: "#FFF",
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                sx={{ width: "100%", minHeight: "100px" }}
              >
                <h1>Create a new Task</h1>
                <p>Manage your tasks efficiently</p>
              </Grid>
            </Grid>
            <Grid container sx={{ width: "100%" }}>
              <CreateTask />
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
