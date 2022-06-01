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
  const [player2Hand, setPlayer2Hand] = useState(cards.slice().reverse());
  const [boardState, setBoardState] = useState(boardStateProto);
  const [currentTurnData, setCurrentTurnData] = useState({
    turnName: 'BLUE',
    hand: player1Hand,
    setHand: setPlayer1Hand,
  });

  const setActiveCard = (index) => {
    console.log('Set selected card: ', index);
    cards[index].isSelected = true;
    //console.log(cards[index]);
    setSelectedCard(index);
  };

  const placeCardOnTile = (index) => {
    //check if tile is free
    //adjust boardState

    if (selectedCard != null) {
      const [xidx, yidx] = index.split('-');
      let state = boardState;

      state[xidx][yidx] = {
        card: currentTurnData.hand[selectedCard],
        owner: currentTurnData.turnName,
      };

      //flip logic, THEN adjust board state as well
      flipCards();
      setBoardState(state);

      //remove from hand
      removeCardHand(currentTurnData.hand);
      setSelectedCard(null);
      //setCurrentTurn(() => (currentTurn === 'BLUE' ? 'RED' : 'BLUE'));
      //TEMPORARY
      setCurrentTurnData({
        turnName: currentTurnData.turnName === 'BLUE' ? 'RED' : 'BLUE',
        hand: currentTurnData.turnName === 'BLUE' ? player2Hand : player1Hand,
        setHand:
          currentTurnData.turnName === 'BLUE' ? setPlayer2Hand : setPlayer1Hand,
      });
    }
  };

  const flipCards = () => {};

  const removeCardHand = (hand) => {
    //setPlayer1Hand(hand.filter((card, index) => index !== selectedCard));
    console.log(currentTurnData);
    currentTurnData.setHand(
      hand.filter((card, index) => index !== selectedCard)
    );
  };

  return (
    <div className='App'>
      <Hand
        cards={player1Hand}
        owner='BLUE'
        setActiveCard={
          currentTurnData.turnName === 'BLUE' ? setActiveCard : undefined
        }
        selectedCard={
          currentTurnData.turnName === 'BLUE' ? selectedCard : undefined
        }
      />
      <Hand
        cards={player2Hand}
        owner='RED'
        setActiveCard={
          currentTurnData.turnName === 'RED' ? setActiveCard : undefined
        }
        selectedCard={
          currentTurnData.turnName === 'RED' ? selectedCard : undefined
        }
      />

      <div>gameboard stuff</div>

      {<Gameboard boardState={boardState} placeCardOnTile={placeCardOnTile} />}
    </div>
  );
}

export default App;
