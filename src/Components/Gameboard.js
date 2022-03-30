import React from 'react';
import Card from './Card';
import Tile from './Tile';
import styles from '../styles/Gameboard.module.css';
export default function Gameboard({ xlen, ylen, boardState }) {
  /*
  render tiles, which will render cards placed on those tiles
  */
  console.log(boardState);
  let visualBoard = [];
  let index = 0;

  boardState.forEach((row, xidx) => {
    let boardRow = [];
    row.forEach((tile, yidx) => {
      let coord = `${xidx}-${yidx}`;
      boardRow.push(<Tile key={coord} cardValues={tile} />);
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
  xlen: 3,
  ylen: 3,
};
