import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Task } from "@/types/task";
import dayjs from "dayjs";

interface TaskDetailProps {
  open: boolean;
  task: Task | null;
  handleClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ open, task, handleClose }) => {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Task Details
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Title:
            </Typography>
            <Typography variant="body1">{task.title}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Description:
            </Typography>
            <Typography variant="body1">{task.description}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Deadline:
            </Typography>
            <Typography variant="body1">
              {dayjs(task.deadline).format("D MMM YYYY")}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetail;
