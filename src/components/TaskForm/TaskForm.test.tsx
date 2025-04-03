import { render, screen, fireEvent, act } from "@testing-library/react";
import TaskForm from "./TaskForm";
import dayjs from "dayjs";

describe("TaskForm Component", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with all fields", () => {
    render(<TaskForm open={true} handleClose={mockHandleClose} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Task/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<TaskForm open={true} handleClose={mockHandleClose} />);

    const createButton = screen.getByRole("button", { name: /Create Task/i });

    await act(async () => {
      fireEvent.click(createButton);
    });

    expect(screen.getByLabelText(/Title/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/Description/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/Deadline/i)).toHaveAttribute("required");
  });

  it("calls handleClose when the cancel button is clicked", async () => {
    render(<TaskForm open={true} handleClose={mockHandleClose} />);

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("allows valid input and submission", async () => {
    render(<TaskForm open={true} handleClose={mockHandleClose} />);

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
        target: { value: dayjs().format("YYYY-MM-DD") },
      });
    });

    expect(titleInput).toHaveValue("Test Task");
    expect(descriptionInput).toHaveValue("This is a test description.");
    expect(deadlineInput).toHaveValue(dayjs().format("YYYY-MM-DD"));

    await act(async () => {
      fireEvent.click(createButton);
    });
    expect(titleInput).toBeEmptyDOMElement();
    expect(descriptionInput).toBeEmptyDOMElement();
    expect(deadlineInput).toBeEmptyDOMElement();
  });
});
