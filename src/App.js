import Card from './Components/Card';
import Gameboard from './Components/Gameboard';
import testCards from './cards.json';
function App() {
  const cards = [
    [1, 3, 'A', 'A'],
    [6, 6, 6, 6],
    [7, 1, 'A', 'A'],
  ];

  console.log(testCards.cards[0]);

  const boardState = [
    [0, testCards.cards[0], 0],
    [testCards.cards[2], 0, testCards.cards[1]],
    [0, 0, 0],
  ];
  return (
    <div className='App'>
      {/* <Card values={[1, 3, 'A', 'A']} />
      <Card values={[6, 6, 6, 6]} />
      <Card values={[0, 1, 2, 3]} />
      <Card {...testCards.cards[0]} /> */}

      <div>gameboard stuff</div>

      {<Gameboard boardState={boardState} />}
    </div>
  );
}

export default App;
