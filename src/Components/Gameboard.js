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
  for (let i = 0; i < xlen; i++) {
    let row = [];
    for (let j = 0; j < ylen; j++) {
      let coord = `${i}${j}`;
      row.push(<Tile key={coord} cardValues={boardState[index]} />);
      index++;
    }

    visualBoard.push(<tr key={`row${i}`}>{row}</tr>);
  }

  return (
    <div>
      {/* <Tile />
      {boardState.map((state, index) => (
        <Tile cardValues={state} key={index} />
      ))} */}
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
