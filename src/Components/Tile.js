import React from 'react';
import styles from '../styles/Tile.module.css';
import Card from './Card';

export default function Tile({ cardValues }) {
  const testClick = (evt) => {
    console.log(cardValues);
  };
  return (
    <td className={styles.container} onClick={testClick}>
      {cardValues ? <Card values={cardValues} /> : <></>}
      {/* <Card values={cardValues} /> */}
    </td>
  );
}
