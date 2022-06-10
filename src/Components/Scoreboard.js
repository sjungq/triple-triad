import React from 'react';
import styles from '../styles/Scoreboard.module.css';

export default function Scoreboard({ currentScore, currentTurn }) {
  return (
    <div className={styles.container}>
      <div
        className={
          `${styles.turnIcon} ` +
          (currentTurn === 'BLUE' ? styles.BLUE : styles.RED)
        }
      ></div>
      <div>BLUE: {currentScore.BLUE}</div>
      <div>RED: {currentScore.RED}</div>
    </div>
  );
}
