import Board from "../Board/Board";
import { useBoards } from "@/hooks/useBoards";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const BoardList: React.FC = () => {
  const { boards } = useBoards();

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={8} wrap="nowrap">
        {boards.map((board) => (
          <Board board={board} />
        ))}
      </Grid>
    </Box>
  );
};

export default BoardList;
