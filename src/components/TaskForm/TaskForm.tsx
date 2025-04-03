import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import dayjs from "dayjs";
import { useActionState } from "react";

interface TaskData {
  title: string | null;
  description: string | null;
  deadline: string | null;
}

const saveNewTask = async (prevFormState: FormData, formData: FormData) => {
  const task = {
    title: formData.get("title"),
    description: formData.get("description"),
    deadline: formData.get("deadline"),
  };
  // Simulate saving the task to a database or API
  console.log("Task saved:", prevFormState);
};

interface TaskFormProps {
  open: boolean;
  handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, handleClose }) => {
  const initialTaskData: TaskData = {
    title: "Toosdf",
    description: " asdfasdfsa",
    deadline: "",
  };
  const [data, action, isLoading] = useActionState(
    saveNewTask,
    initialTaskData
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: () => ({
          sx: {
            backgroundColor: "#F1E7E7",
          },
        }),
      }}
    >
      <DialogTitle sx={{ fontSize: "2rem" }}>Create New Task</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          action={action}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            name="title"
            variant="standard"
            defaultValue={data?.title}
            placeholder="Task Title"
            required
            slotProps={{
              htmlInput: () => ({
                maxLength: 200,
                pattern: "^[a-zA-Z1-9].*",
              }),
            }}
          />
          <TextField
            label="Description"
            name="description"
            variant="standard"
            multiline
            rows={4}
            defaultValue={data?.description}
            placeholder="Task Description"
            required
            slotProps={{
              htmlInput: () => ({
                maxLength: 500,
                pattern: "^[a-zA-Z1-9].*",
              }),
            }}
          />
          <TextField
            label="Deadline"
            name="deadline"
            variant="standard"
            type="date"
            slotProps={{
              inputLabel: () => ({
                shrink: true,
              }),
              htmlInput: () => ({
                min: dayjs().format("YYYY-MM-DD").toString(),
                max: dayjs().add(1, "year").format("YYYY-MM-DD").toString(),
              }),
            }}
            defaultValue={data?.deadline}
            required
          />
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Create Task
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
