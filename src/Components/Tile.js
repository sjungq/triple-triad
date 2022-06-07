import React from 'react';
import styles from '../styles/Tile.module.css';
import Card from './Card';

export default function Tile({ card, owner, flipped, index, placeCard }) {
  const testClick = (evt) => {
    if (card) {
      //console.log(card.values, owner);
    } else {
      console.log('EMPTY', index);
    }
  };

  const returnIndex = (evt) => {
    if (!card) placeCard(index);
  };

  //let owner = card ? 'BLUE' : '';
  return (
    <td className={`${styles.container} ${styles[owner]}`}>
      <button className={styles.tileButton} onClick={returnIndex}>
        {card ? <Card {...card} owner={owner} flipped={flipped} /> : <></>}
        {/* <Card values={cardValues} /> */}
      </button>
    </td>
  );
}
