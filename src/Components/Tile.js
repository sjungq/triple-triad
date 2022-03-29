import React from 'react';
import styles from '../styles/Tile.module.css';
import Card from './Card';

export default function Tile({ cardValues }) {
  return (
    <div className={styles.container}>
      {cardValues ? <Card values={cardValues} /> : <></>}
      {/* <Card values={cardValues} /> */}
    </div>
  );
}
