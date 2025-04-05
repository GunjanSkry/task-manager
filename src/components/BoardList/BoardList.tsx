import Board from "../Board/Board";
import { useBoards } from "@/hooks/useBoards";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const BoardList: React.FC = () => {
  const { boards } = useBoards();

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container justifyContent="center">
        {boards.map((board) => (
          <Grid container sx={{ flexGrow: 1 }} key={board.id}>
            <Board board={board} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BoardList;
