import React from 'react';
import Card from './Card';
import Tile from './Tile';
import styles from '../styles/Gameboard.module.css';
export default function Gameboard({ xlen, ylen, boardState, placeCardOnTile }) {
  /*
  render tiles, which will render cards placed on those tiles
  */
  //console.log(boardState);
  let visualBoard = [];
  let index = 0;

  boardState.forEach((row, xidx) => {
    let boardRow = [];
    row.forEach((tile, yidx) => {
      let coord = `${xidx}-${yidx}`;
      boardRow.push(
        <Tile
          key={coord}
          card={tile.card}
          owner={tile.owner}
          index={`${xidx}-${yidx}`}
          placeCard={placeCardOnTile}
        />
      );
    });

    visualBoard.push(<tr key={`row${xidx}`}>{boardRow}</tr>);
  });

  return (
    <div>
      <table className={styles.board}>
        <tbody>{visualBoard}</tbody>
      </table>
    </div>
  );
}

Gameboard.defaultProps = {
  //shouldn't be needed
  xlen: 3,
  ylen: 3,
};
