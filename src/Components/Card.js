import React from 'react';
import styles from '../styles/Card.module.css';

export default function Card({
  values,
  rank,
  url,
  owner,
  name,
  setActiveCard,
  index,
  flipped,
}) {
  const valuePositions = ['N', 'W', 'E', 'S'];

  const style = {
    backgroundImage: `url(/images/${url})`,
  };

  const flipStyle = flipped ? styles.flipped : '';

  const cardClick = (evt) => {
    if (setActiveCard) {
      setActiveCard(index);
    } else {
      console.log(values, owner);
    }
  };
  return (
    <div
      style={style}
      className={
        `${styles.container} ${flipStyle} ` +
        (owner === 'BLUE' ? styles.BLUE : styles.RED)
      }
      onClick={cardClick}
      title={name}
      key={`${owner}${index}`}
    >
      <div className={styles.rank}>{rank}</div>
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
  flipped: false,
};
