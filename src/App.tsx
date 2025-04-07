import "./App.css";
import BoardList from "./components/BoardList/BoardList";
import BoardsProvider from "./contexts/BoardContext";

function App() {
  return (
    <>
      <BoardsProvider>
        <BoardList />
      </BoardsProvider>
    </>
  );
}

export default App;
