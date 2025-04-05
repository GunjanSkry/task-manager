import { render, screen, fireEvent, act } from "@testing-library/react";
import TaskDetail from "./TaskDetail";
import { Task } from "@/types/task";

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "This is a test task",
  deadline: "2025-04-10",
};

const mockHandleClose = jest.fn();

describe("TaskDetail Component", () => {
  it("renders task details when open", () => {
    render(
      <TaskDetail open={true} task={mockTask} handleClose={mockHandleClose} />
    );

    expect(screen.getByText("Task Details")).toBeInTheDocument();

    expect(screen.getByText("Title:")).toBeInTheDocument();
    expect(screen.getByText("Test Task")).toBeInTheDocument();

    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("This is a test task")).toBeInTheDocument();

    expect(screen.getByText("Deadline:")).toBeInTheDocument();
    expect(screen.getByText("10 Apr 2025")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls handleClose when the close button is clicked", () => {
    render(
      <TaskDetail open={true} task={mockTask} handleClose={mockHandleClose} />
    );

    act(() => {
      screen.getByRole("button", { name: /close/i }).click();
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
