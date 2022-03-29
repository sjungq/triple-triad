import React from 'react';
import Card from './Card';
import Tile from './Tile';
export default function Gameboard({ xlen, ylen, boardState }) {
  /*
  render tiles, which will render cards placed on those tiles
  */
  console.log(boardState);

  return (
    <div>
      <Tile />
      {boardState.map((state, index) => (
        <Tile cardValues={state} key={index} />
      ))}
    </div>
  );
}
