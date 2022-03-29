import Card from './Components/Card';
import Gameboard from './Components/Gameboard';
function App() {
  const cards = [
    [1, 3, 'A', 'A'],
    [6, 6, 6, 6],
  ];
  return (
    <div className='App'>
      <Card values={[1, 3, 'A', 'A']} />
      <Card values={[6, 6, 6, 6]} />
      <Card values={[0, 1, 2, 3]} />

      <Gameboard boardState={cards} />
    </div>
  );
}

export default App;
