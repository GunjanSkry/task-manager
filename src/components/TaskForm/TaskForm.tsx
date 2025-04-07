import { Task } from "@/types/task";
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
import { FORM_MODES } from "@/constants/form-modes";

interface TaskFormProps {
  open: boolean;
  handleClose: () => void;
  getFormData: (data: Task) => void;
  initialTaskFormData?: {
    title: string;
    description: string;
    deadline: string;
  };
  mode?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  handleClose,
  getFormData,
  initialTaskFormData = {
    id: "",
    title: "",
    description: "",
    deadline: "",
  },
  mode = FORM_MODES.CREATE,
}) => {
  const saveNewTask = async (_prevFormData: unknown, formData: FormData) => {
    const task: Task = {
      title: formData.get("title")?.toString().trim() || "",
      description: formData.get("description")?.toString().trim() || "",
      deadline: formData.get("deadline")?.toString().trim() || "",
    };

    getFormData(task);
    return task;
  };

  const [data, action, isPending] = useActionState<Task, FormData>(
    saveNewTask,
    initialTaskFormData
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
      <DialogTitle sx={{ fontSize: "2rem" }}>
        {mode === FORM_MODES.EDIT ? "Edit Task" : "Create New Task"}
      </DialogTitle>
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
            defaultValue={data?.title || initialTaskFormData.title}
            placeholder="Task Title"
            autoFocus
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
            defaultValue={data?.description || initialTaskFormData.description}
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
            defaultValue={data?.deadline || initialTaskFormData.deadline}
            required
          />
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={isPending}
            >
              {mode === FORM_MODES.EDIT ? "Update Task" : "Create Task"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
