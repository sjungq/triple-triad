import React from 'react';
import styles from '../styles/Tile.module.css';
import Card from './Card';

export default function Tile({ card, owner }) {
  const testClick = (evt) => {
    if (card) {
      //console.log(card.values, owner);
    } else {
      console.log('EMPTY');
    }
  };

  //let owner = card ? 'BLUE' : '';
  return (
    <td className={`${styles.container} ${styles[owner]}`} onClick={testClick}>
      {card ? <Card {...card} owner={owner} /> : <></>}
      {/* <Card values={cardValues} /> */}
    </td>
  );
}
