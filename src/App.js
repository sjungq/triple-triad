import Card from './Components/Card';
import Gameboard from './Components/Gameboard';
function App() {
  const cards = [
    [1, 3, 'A', 'A'],
    [6, 6, 6, 6],
    [7, 1, 'A', 'A'],
  ];

  const boardState = [
    [0, [2, 5, 'A', 'A'], 0],
    [[6, 6, 6, 6], 0, 0],
    [0, 0, ['A', 3, 6, 'A']],
  ];
  return (
    <div className='App'>
      <Card values={[1, 3, 'A', 'A']} />
      <Card values={[6, 6, 6, 6]} />
      <Card values={[0, 1, 2, 3]} />

      <div>gameboard stuff</div>

      {<Gameboard boardState={boardState} />}
    </div>
  );
}

export default App;
