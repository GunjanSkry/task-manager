import { render, screen, act } from "@testing-library/react";
import Board from "./Board";
import { BoardType } from "@/types/board";

const mockBoard: BoardType = {
  id: "1",
  name: "Test Board",
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      deadline: "2025-04-10",
    },
  ],
};

const mockAddTaskToBoard = jest.fn();
const mockRemoveTaskFromBoard = jest.fn();
const mockUpdateTaskInBoard = jest.fn();

jest.mock("@/hooks/useBoards", () => ({
  useBoards: () => ({
    addTaskToBoard: mockAddTaskToBoard,
    removeTaskFromBoard: mockRemoveTaskFromBoard,
    updateTaskInBoard: mockUpdateTaskInBoard,
  }),
}));

describe("Board Component", () => {
  it("renders board name and tasks", () => {
    render(<Board board={mockBoard} />);

    expect(screen.getByText("Test Board")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("calls removeTaskFromBoard when a task is deleted", () => {
    render(<Board board={mockBoard} />);

    act(() => {
      screen.getByRole("button", { name: "delete task" }).click();
    });

    expect(mockRemoveTaskFromBoard).toHaveBeenCalledWith("1", "1");
  });

  it("opens the task form when 'New Task' button is clicked", () => {
    render(<Board board={mockBoard} />);

    act(() => {
      screen.getByText("New Task").click();
    });

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
  });
});
