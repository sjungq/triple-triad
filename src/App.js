import Card from './Components/Card';
import Hand from './Components/Hand';
import Gameboard from './Components/Gameboard';
import testCards from './cards.json';
import { useState } from 'react';
function App() {
  const cards = testCards.cards.map((card) => {
    return { ...card, isSelected: false };
  });

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
  console.log(cards);

  const setActiveCard = (index) => {
    console.log('Set selected card: ', index);
    setSelectedCard(index);
  };
  return (
    <div className='App'>
      <Hand
        cards={cards}
        owner='BLUE'
        setActiveCard={setActiveCard}
        selectedCard={selectedCard}
      />
      <Hand cards={cards.slice().reverse()} owner='RED' />

      <div>gameboard stuff</div>

      {<Gameboard boardState={boardState} />}
    </div>
  );
}

export default App;
