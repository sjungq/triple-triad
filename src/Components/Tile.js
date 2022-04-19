import React from 'react';
import styles from '../styles/Tile.module.css';
import Card from './Card';

export default function Tile({ card }) {
  const testClick = (evt) => {
    console.log(card.values);
  };
  return (
    <td className={styles.container} onClick={testClick}>
      {card ? <Card {...card} /> : <></>}
      {/* <Card values={cardValues} /> */}
    </td>
  );
}
