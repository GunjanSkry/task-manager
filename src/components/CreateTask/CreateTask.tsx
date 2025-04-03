import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TaskForm from "../TaskForm/TaskForm";

const CreateTask: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Button
        fullWidth
        variant="text"
        onClick={handleOpen}
        startIcon={<span style={{ fontSize: "1.5rem" }}>+</span>}
        sx={{
          border: 0,
          color: "#fff",
          fontWeight: "bold",
          backgroundColor: "transparent",
          opacity: 0.9,
          "&:hover": {
            opacity: 1,
          },
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
        }}
      >
        New Task
      </Button>
      <TaskForm open={open} handleClose={handleClose} />
    </Box>
  );
};

export default CreateTask;
