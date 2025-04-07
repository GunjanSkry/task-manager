import { render, screen, fireEvent, act } from "@testing-library/react";
import TaskForm from "./TaskForm";
import dayjs from "dayjs";
import { FORM_MODES } from "@/constants/form-modes";

const mockHandleClose = jest.fn();
const mockGetFormData = jest.fn();

describe("TaskForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create new task form with all fields", () => {
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
      />
    );

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Task/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("renders Edit task form with all fields", () => {
    const deadline = dayjs().format("YYYY-MM-DD");
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
        mode={FORM_MODES.EDIT}
        initialTaskFormData={{
          title: "Test Task",
          description: "Test Description",
          deadline: deadline,
        }}
      />
    );

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toHaveValue("Test Task");
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      "Test Description"
    );
    expect(screen.getByLabelText(/Deadline/i)).toHaveValue(deadline);
    expect(
      screen.getByRole("button", { name: /Update Task/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
      />
    );

    const createButton = screen.getByRole("button", { name: /Create Task/i });

    await act(async () => {
      fireEvent.click(createButton);
    });

    expect(screen.getByLabelText(/Title/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/Description/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/Deadline/i)).toHaveAttribute("required");
  });

  it("calls handleClose when the cancel button is clicked", async () => {
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("allows valid input and submission for create new task", async () => {
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
      />
    );

    const deadline = dayjs().add(1, "day").format("YYYY-MM-DD");
    const titleInput = screen.getByLabelText(/Title/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const deadlineInput = screen.getByLabelText(/Deadline/i);
    const createButton = screen.getByRole("button", { name: /Create Task/i });

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Test Task" } });
      fireEvent.change(descriptionInput, {
        target: { value: "This is a test description." },
      });
      fireEvent.change(deadlineInput, {
        target: { value: deadline },
      });
    });

    expect(titleInput).toHaveValue("Test Task");
    expect(descriptionInput).toHaveValue("This is a test description.");
    expect(deadlineInput).toHaveValue(deadline);

    await act(async () => {
      fireEvent.click(createButton);
    });

    expect(mockGetFormData).toHaveBeenCalledWith({
      title: "Test Task",
      description: "This is a test description.",
      deadline: deadline,
    });
  });

  it("allows valid input and submission for update task", async () => {
    const deadline = dayjs().add(1, "day").format("YYYY-MM-DD");
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
        mode={FORM_MODES.EDIT}
        initialTaskFormData={{
          title: "Test Task",
          description: "Test Description",
          deadline: deadline,
        }}
      />
    );

    const titleInput = screen.getByLabelText(/Title/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const deadlineInput = screen.getByLabelText(/Deadline/i);
    const createButton = screen.getByRole("button", { name: /Update Task/i });

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Updated Task" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Updated Description" },
      });
    });

    expect(titleInput).toHaveValue("Updated Task");
    expect(descriptionInput).toHaveValue("Updated Description");
    expect(deadlineInput).toHaveValue(deadline);

    await act(async () => {
      fireEvent.click(createButton);
    });

    expect(mockGetFormData).toHaveBeenCalledWith({
      title: "Updated Task",
      description: "Updated Description",
      deadline: deadline,
    });
  });

  it("form should not have previous form value when creating new task", async () => {
    const deadline = dayjs().add(1, "day").format("YYYY-MM-DD");
    render(
      <TaskForm
        open={true}
        handleClose={mockHandleClose}
        getFormData={mockGetFormData}
        mode={FORM_MODES.CREATE}
      />
    );

    const titleInput = screen.getByLabelText(/Title/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const deadlineInput = screen.getByLabelText(/Deadline/i);
    const createButton = screen.getByRole("button", { name: /Create Task/i });

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "New Task" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Task Description" },
      });
      fireEvent.change(deadlineInput, {
        target: { value: deadline },
      });
    });

    expect(titleInput).toHaveValue("New Task");
    expect(descriptionInput).toHaveValue("Task Description");

    await act(async () => {
      fireEvent.click(createButton);
    });

    expect(mockGetFormData).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
      deadline: deadline,
    });

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(deadlineInput).toHaveValue("");
  });
});
