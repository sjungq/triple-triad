import Card from './Components/Card';
import Hand from './Components/Hand';
import Gameboard from './Components/Gameboard';
import testCards from './cards.json';
import { useState } from 'react';
function App() {
  const cards = [
    [1, 3, 'A', 'A'],
    [6, 6, 6, 6],
    [7, 1, 'A', 'A'],
  ];

  const boardState = [
    [0, { card: testCards.cards[0], owner: 'BLUE' }, 0],
    [
      { card: testCards.cards[2], owner: 'RED' },
      0,
      { card: testCards.cards[1], owner: 'BLUE' },
    ],
    [0, 0, 0],
  ];

  //just testing if this works
  const [selectedCard, setSelectedCard] = useState(null);

  const selectCard = (item) => {
    console.log('Set selected card: ', item);
    setSelectedCard(item);
  };
  return (
    <div className='App'>
      <Hand cards={testCards.cards} owner='BLUE' select={selectCard} />
      <Hand cards={testCards.cards} owner='RED' />
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
