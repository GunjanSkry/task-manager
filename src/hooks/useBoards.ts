import { useContext } from "react";
import { BoardsContextType, BoardsContext } from "../contexts/BoardContext";

export const useBoards = (): BoardsContextType => {
    const context = useContext(BoardsContext);
    if (!context) {
        throw new Error("useBoards must be used within a BoardsProvider");
    }
    return context;
};