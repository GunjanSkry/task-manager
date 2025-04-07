import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
}

const LOCAL_STORAGE_KEY = "boards";

interface DraggedTask {
  boardId: string;
  task: Task;
}

export interface BoardsContextType {
  boards: Board[];
  addBoard: (name: string) => void;
  removeBoard: (boardId: string) => void;
  addTaskToBoard: (boardId: string, task: Task) => void;
  removeTaskFromBoard: (boardId: string, taskId: string) => void;
  updateTaskInBoard: (
    boardId: string,
    taskId: string,
    updatedTask: Partial<Task>
  ) => void;
  moveTaskAcrossBoard: (newBoardId: string, payload: DraggedTask) => void;
}

export const BoardsContext = createContext<BoardsContextType | null>(null);

interface BoardsProviderProps {
  children: React.ReactNode;
}

const checkLocalStorage = () => {
  const storedBoards = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedBoards) {
    const board = JSON.parse(storedBoards);
    return board;
  }

  const initialBoards: Board[] = [
    {
      id: uuidv4(),
      name: "Tasks To Do",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "In Progress",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "Done",
      tasks: [],
    },
  ];

  return initialBoards;
};

const BoardsProvider = ({ children }: BoardsProviderProps): React.ReactNode => {
  const [boards, setBoards] = useState<Board[]>(checkLocalStorage());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boards));
  }, [boards]);

  const addBoard = (name: string) => {
    const newBoard: Board = {
      id: uuidv4(),
      name,
      tasks: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const removeBoard = (boardId: string) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );
  };

  const addTaskToBoard = (boardId: string, task: Task) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, task] }
          : board
      )
    );
  };

  const removeTaskFromBoard = (boardId: string, taskId: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board
      )
    );
  };

  const updateTaskInBoard = (
    boardId: string,
    taskId: string,
    updatedTask: Partial<Task>
  ) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : board
      )
    );
  };

  const moveTaskAcrossBoard = (newBoardId: string, payload: DraggedTask) => {
    const { boardId: oldBoardId, task: oldBoardTask } = payload;
    if (newBoardId !== oldBoardId) {
      setBoards((prevBoards) => {
        return prevBoards.map((board) => {
          if (board.id === oldBoardId) {
            board.tasks = board.tasks.filter(
              (task) => task.id !== oldBoardTask.id
            );
          }
          if (board.id === newBoardId) {
            board.tasks = [...board.tasks, oldBoardTask];
          }
          return { ...board };
        });
      });
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        boards,
        addBoard,
        removeBoard,
        addTaskToBoard,
        removeTaskFromBoard,
        updateTaskInBoard,
        moveTaskAcrossBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;
