import Card from './Components/Card';
import Hand from './Components/Hand';
import Gameboard from './Components/Gameboard';
import testCards from './cards.json';
import React, { useState } from 'react';
import Scoreboard from './Components/Scoreboard';
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
    cards[index].isSelected = true;
    setSelectedCard(index);
  };

  const placeCardOnTile = (index) => {
    if (selectedCard != null) {
      const [xidx, yidx] = index.split('-').map(Number);
      let state = boardState;

      state[xidx][yidx] = {
        card: currentTurnData.hand[selectedCard],
        owner: currentTurnData.turnName,
        flipped: false,
      };

      //flip logic, THEN adjust board state as well
      let postFlipState = flipNeighborCards(state, {
        xidx: xidx,
        yidx: yidx,
      });
      setBoardState(postFlipState);

      //remove from hand
      removeCardHand(currentTurnData.hand);
      setSelectedCard(null);
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

  const flipNeighborCards = (state, { xidx, yidx }) => {
    let postFlipState = state;
    const cardOwner = state[xidx][yidx].owner;

    const placedCardValues = state[xidx][yidx].card.values.map((value) => {
      if (value === 'A') {
        return 10;
      } else {
        return value;
      }
    });
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

    /**Note for future:
     * What if we actually stored the card above? To make
     * below search cleaner?
     */

    /**
     * For now, below is just searching every neighbor and comparing
     * the relevant cardinal values for a flip
     */

    let flippedCoords = [];

    filteredCardinals.forEach(({ cardinal, coords }) => {
      //console.log('cardinal:', cardinal, postFlipState[coords.x][coords.y]);
      if (
        postFlipState[coords.x][coords.y] &&
        postFlipState[coords.x][coords.y].owner !== cardOwner
      ) {
        let flipped = false;
        if (cardinal === 'n') {
          //
          if (
            placedCardValues[0] >
            postFlipState[coords.x][coords.y].card.values[3]
          ) {
            flipped = true;
          }
        } else if (cardinal === 'e') {
          if (
            placedCardValues[2] >
            postFlipState[coords.x][coords.y].card.values[1]
          ) {
            flipped = true;
          }
        } else if (cardinal === 's') {
          if (
            placedCardValues[3] >
            postFlipState[coords.x][coords.y].card.values[0]
          ) {
            flipped = true;
          }
        } else if (cardinal === 'w') {
          //
          if (
            placedCardValues[1] >
            postFlipState[coords.x][coords.y].card.values[2]
          ) {
            flipped = true;
          }
        }
        if (flipped) {
          flippedCoords.push({
            tile: postFlipState[coords.x][coords.y],
            x: coords.x,
            y: coords.y,
          });
        }
      }
    });
    flippedCoords.forEach(({ tile }) => {
      tile.owner = cardOwner;
      tile.flipped = true;
    });

    return postFlipState;
  };

  const removeCardHand = (hand) => {
    currentTurnData.setHand(
      hand.map((card, index) => {
        if (index === selectedCard) {
          return 0;
        } else {
          return card;
        }
      })
    );
  };

  /**
   * For later:
   * - Look at order of execution for setCurrentTurnData
   *  - had to set hand to "cards" because state set wasn't executed due to React batching
   * - store both players' hands for the sake of this reset
   */
  const resetGame = () => {
    setBoardState(boardStateProto);
    setPlayer1Hand(cards);
    setPlayer2Hand(cards.slice().reverse());
    setCurrentTurnData({
      turnName: 'BLUE',
      hand: cards,
      setHand: setPlayer1Hand,
    });
    setSelectedCard(null);
    setCurrentScore({ BLUE: 0, RED: 0 });
  };

  return (
    <div className='App'>
      <h3>It is currently {currentTurnData.turnName}'s turn.</h3>
      <Scoreboard
        currentScore={currentScore}
        currentTurn={currentTurnData.turnName}
      />
      <button onClick={resetGame}>Reset</button>
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
      <Gameboard boardState={boardState} placeCardOnTile={placeCardOnTile} />
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
