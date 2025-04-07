import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";
import { act } from "react";

const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  deadline: "2025-10-10",
};

const mockHandleOpen = jest.fn();
const mockOnDelete = jest.fn();
const mockSetFormMode = jest.fn();
const mockSetSelectedTask = jest.fn();

describe("TaskCard Component", () => {
  it("render task title and deadline", () => {
    render(
      <TaskCard
        task={mockTask}
        handleOpen={mockHandleOpen}
        setFormMode={mockSetFormMode}
        setSelectedTask={mockSetSelectedTask}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("10 Oct 2025")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        handleOpen={mockHandleOpen}
        setFormMode={mockSetFormMode}
        setSelectedTask={mockSetSelectedTask}
        onDelete={mockOnDelete}
      />
    );
    act(() => {
      screen.getByRole("button", { name: "delete task" }).click();
    });
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("calls setSelectedTask, setFormMode and handleOpen when edit button is clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        handleOpen={mockHandleOpen}
        setFormMode={mockSetFormMode}
        setSelectedTask={mockSetSelectedTask}
        onDelete={mockOnDelete}
      />
    );
    act(() => {
      screen.getByRole("button", { name: "edit task" }).click();
    });
    expect(mockSetSelectedTask).toHaveBeenCalledTimes(1);
    expect(mockSetFormMode).toHaveBeenCalledWith("edit");
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });
});
