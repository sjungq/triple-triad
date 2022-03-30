import React from 'react';
import styles from '../styles/Card.module.css';
import img from '../images/FatCatHeart.png';

export default function Card({ values }) {
  //const stats = [1, 2, 3, 4];
  const valuePositions = ['N', 'W', 'E', 'S'];
  return (
    <div className={styles.container}>
      <div className={styles.rank}>test</div>
      {/* <img src={img} alt='card-art' /> */}
      <div className={styles.values}>
        {values.map((stat, index) => (
          <div key={index} className={styles[valuePositions[index]]}>
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}
