import React from 'react';
import styles from '../styles/Card.module.css';
//import img from '../images/FatCatHeart.png';

export default function Card({ values, rank, url }) {
  //const stats = [1, 2, 3, 4];
  const valuePositions = ['N', 'W', 'E', 'S'];
  const style = { backgroundImage: `url(/images/${url})` };
  return (
    <div style={style} className={styles.container}>
      <div className={styles.rank}>{rank}</div>
      {/* <img src={`${process.env.PUBLIC_URL}/images/${url}`} alt='card-art' /> */}
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

Card.defaultProps = {
  rank: 3,
};
