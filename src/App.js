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
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const [player1Hand, setPlayer1Hand] = useState(cards);
  const [player2Hand, setPlayer2Hand] = useState(cards.slice().reverse());
  const [boardState, setBoardState] = useState(boardStateProto);
  const [currentTurnData, setCurrentTurnData] = useState({
    turnName: 'BLUE',
    hand: player1Hand,
    setHand: setPlayer1Hand,
  });
  const [currentScore, setCurrentScore] = useState({
    BLUE: 0,
    RED: 0,
  });

  const countCurrentScore = (boardState) => {
    let currentScore = {
      BLUE: 0,
      RED: 0,
    };
    //note for future self - maybe we could do better tracking
    //of score changes every turn instead of rereading the entire
    //board to read score?
    boardState.forEach((row) => {
      row.forEach((tile) => {
        if (tile.owner) {
          currentScore[tile.owner]++;
        }
      });
    });

    return currentScore;
  };

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
      const [xidx, yidx] = index.split('-').map(Number);
      let state = boardState;

      state[xidx][yidx] = {
        card: currentTurnData.hand[selectedCard],
        owner: currentTurnData.turnName,
      };

      //flip logic, THEN adjust board state as well
      state = flipCards(state, { xidx: xidx, yidx: yidx });
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
      setCurrentScore(countCurrentScore(state));
    }
  };

  const checkBounds = ({ x, y }) => {
    return x >= 0 && x <= 2 && y >= 0 && y <= 2;
  };

  const flipCards = (state, { xidx, yidx }) => {
    let postFlipState = state;
    const cardOwner = state[xidx][yidx].owner;
    const placedCard = state[xidx][yidx].card;

    const placedCardValues = state[xidx][yidx].card.values.map((value) => {
      if (value === 'A') {
        return 10;
      } else {
        return value;
      }
    });
    // console.log('Card placed:', state[xidx][yidx]);
    //check cardinals
    //up right down left
    const coords = {
      n: { x: xidx - 1, y: yidx },
      e: { x: xidx, y: yidx + 1 },
      s: { x: xidx + 1, y: yidx },
      w: { x: xidx, y: yidx - 1 },
    };

    const filteredCardinals = Object.keys(coords)
      .filter((key) => checkBounds(coords[key]))
      .map((cardinal) => ({
        cardinal: cardinal,
        coords: coords[cardinal],
      }));
    console.log(placedCard);

    /**Note for future:
     * What if we actually stored the card above? To make
     * below search cleaner?
     */

    /**
     * For now, below is just searching every neighbor and comparing
     * the relevant cardinal values for a flip
     */

    filteredCardinals.forEach(({ cardinal, coords }) => {
      if (
        postFlipState[coords.x][coords.y] &&
        postFlipState[coords.x][coords.y] !== cardOwner
      ) {
        if (cardinal === 'n') {
          //
          if (
            placedCardValues[0] >
            postFlipState[coords.x][coords.y].card.values[3]
          ) {
            postFlipState[coords.x][coords.y].owner = cardOwner;
          }
        } else if (cardinal === 'e') {
          if (
            placedCardValues[2] >
            postFlipState[coords.x][coords.y].card.values[1]
          ) {
            postFlipState[coords.x][coords.y].owner = cardOwner;
          }
        } else if (cardinal === 's') {
          if (
            placedCardValues[3] >
            postFlipState[coords.x][coords.y].card.values[0]
          ) {
            postFlipState[coords.x][coords.y].owner = cardOwner;
          }
        } else if (cardinal === 'w') {
          //
          if (
            placedCardValues[1] >
            postFlipState[coords.x][coords.y].card.values[2]
          ) {
            postFlipState[coords.x][coords.y].owner = cardOwner;
          }
        }
      }
    });

    // filteredCoords.forEach(({ x, y }) => {
    //   if (postFlipState[x][y]) {
    //     if (postFlipState[x][y].owner !== cardOwner) {
    //       console.log('Opposite:', postFlipState[x][y]);
    //     }
    //   }
    // });

    return postFlipState;
  };

  const removeCardHand = (hand) => {
    //setPlayer1Hand(hand.filter((card, index) => index !== selectedCard));
    currentTurnData.setHand(
      hand.filter((card, index) => index !== selectedCard)
    );
  };

  return (
    <div className='App'>
      <h3>It is currently {currentTurnData.turnName}'s turn.</h3>
      <h5>Blue:{currentScore.BLUE}</h5>
      <h5>Red:{currentScore.RED}</h5>
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
      {<Gameboard boardState={boardState} placeCardOnTile={placeCardOnTile} />}
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
    </div>
  );
}

export default App;
