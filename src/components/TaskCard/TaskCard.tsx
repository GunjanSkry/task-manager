import React, { useState } from "react";
import { Box, Typography, IconButton, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { Task } from "@/types/task";
import dayjs from "dayjs";
import { FORM_MODES } from "@/constants/form-modes";
import TaskDetail from "../TaskDetail/TaskDetail";

interface TaskProps {
  task: Task;
  onDelete: (taskId: string) => void;
  setSelectedTask: (task: Task) => void;
  setFormMode: (mode: string) => void;
  handleOpen: () => void;
}

const buttonOutlineStyle = {
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
};

const TaskCard: React.FC<TaskProps> = ({
  task,
  onDelete,
  setFormMode,
  setSelectedTask,
  handleOpen,
}) => {
  const [open, setOpen] = useState(false);

  const deadline: string = dayjs(task.deadline).format("D MMM YYYY");

  const onClickEdit = (task: Task) => {
    setSelectedTask(task);
    setFormMode(FORM_MODES.EDIT);
    handleOpen();
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{
          width: "100%",
          flexGrow: 1,
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ padding: "0.25rem 0.5rem" }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            gap={1}
          >
            <Box display="flex" justifyContent="flex-start" marginTop={0.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                }}
              >
                {task.title}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <DangerousIcon
                fontSize="small"
                color="error"
                sx={{ marginRight: "0.5rem" }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
              >
                {deadline}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
            <IconButton
              color="primary"
              onClick={() => onClickEdit(task)}
              aria-label="edit task"
              sx={{ ...buttonOutlineStyle }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(task.id as string)}
              aria-label="delete task"
              sx={{ ...buttonOutlineStyle }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <TaskDetail open={open} task={task} handleClose={() => setOpen(false)} />
    </>
  );
};

export default TaskCard;
