import Card from './Components/Card';
import Hand from './Components/Hand';
import Gameboard from './Components/Gameboard';
import testCards from './cards.json';
import { useState } from 'react';
function App() {
  const cards = testCards.cards.map((card) => {
    return { ...card };
  });

  const boardStateProto = [
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

  const [player1Hand, setPlayer1Hand] = useState(cards);
  const [boardState, setBoardState] = useState(boardStateProto);

  const setActiveCard = (index) => {
    console.log('Set selected card: ', index);
    cards[index].isSelected = true;
    //console.log(cards[index]);
    setSelectedCard(index);
  };

  const placeCardOnTile = (index) => {
    //check if tile is free
    //adjust boardState

    if (selectedCard) {
      const [xidx, yidx] = index.split('-');
      let state = boardState;
      state[xidx][yidx] = { card: player1Hand[selectedCard], owner: 'BLUE' };
      setBoardState(state);
      //console.log('state: ', state);
      //console.log('card: ', player1Hand[selectedCard]);
      //remove from hand
      removeCardHand(player1Hand);
      setSelectedCard(null);
    }
  };

  const removeCardHand = (hand) => {
    setPlayer1Hand(hand.filter((card, index) => index !== selectedCard));
  };
  return (
    <div className='App'>
      <Hand
        cards={player1Hand}
        owner='BLUE'
        setActiveCard={setActiveCard}
        selectedCard={selectedCard}
      />
      <Hand cards={cards.slice().reverse()} owner='RED' />

      <div>gameboard stuff</div>

      {<Gameboard boardState={boardState} placeCardOnTile={placeCardOnTile} />}
    </div>
  );
}

export default App;
