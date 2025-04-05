import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TaskCard from "../TaskCard/TaskCard";
import Typography from "@mui/material/Typography";
import { BoardType } from "@/types/board.ts";
import TaskForm from "../TaskForm/TaskForm";
import { useBoards } from "@/hooks/useBoards";
import { Task } from "@/types/task";
import { useFormDialog } from "@/hooks/useFormDialog";
import { FORM_MODES } from "@/constants/form-modes";
import { v4 as uuidv4 } from "uuid";

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

interface IBoardProps {
  board: BoardType;
}

const defultFormData = {
  id: "",
  title: "",
  description: "",
  deadline: "",
};

const Board: React.FC<IBoardProps> = ({ board }) => {
  const { open, handleOpen, handleClose } = useFormDialog();
  const [formMode, setFormMode] = useState<string>(FORM_MODES.CREATE);
  const [selectedTask, setSelectedTask] = useState<Task>(defultFormData);
  const { addTaskToBoard, removeTaskFromBoard, updateTaskInBoard } =
    useBoards();

  const onClickNewTask = () => {
    setFormMode(FORM_MODES.CREATE);
    setSelectedTask(defultFormData);
    handleOpen();
  };

  const handleDelete = (taskid: string) => {
    removeTaskFromBoard(board.id, taskid);
  };

  const getFormData = (data: Task) => {
    if (formMode === FORM_MODES.EDIT) {
      updateTaskInBoard(board.id, selectedTask?.id as string, data);
    } else if (formMode === FORM_MODES.CREATE) {
      const newData = {
        ...data,
        id: uuidv4(),
      };
      addTaskToBoard(board.id, newData);
    }
    handleClose();
  };

  return (
    <Grid size={4}>
      <Item>
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#FFF", fontWeight: "bold" }}
          >
            <span style={{ fontSize: "1.5rem" }}>📝</span> {board.name}
          </Typography>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{
            backgroundColor: "transparent",
          }}
          gap={1}
        >
          {board.tasks.length > 0 ? (
            board.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                setSelectedTask={setSelectedTask}
                setFormMode={setFormMode}
                handleOpen={handleOpen}
              />
            ))
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{
                width: "100%",
                minHeight: "100px",
                backgroundColor: "#fff",
              }}
            >
              <h1>Create a new Task</h1>
              <p>Manage your tasks efficiently</p>
            </Grid>
          )}
        </Grid>
        <Grid container sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="text"
            onClick={() => onClickNewTask()}
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
          <TaskForm
            open={open}
            handleClose={handleClose}
            getFormData={getFormData}
            mode={formMode}
            initialTaskFormData={FORM_MODES.EDIT ? selectedTask : undefined}
          />
        </Grid>
      </Item>
    </Grid>
  );
};

export default Board;
