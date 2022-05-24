import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
//import img from '../images/FatCatHeart.png';

export default function Card({
  values,
  rank,
  url,
  owner,
  name,
  select,
  index,
}) {
  //const stats = [1, 2, 3, 4];
  const valuePositions = ['N', 'W', 'E', 'S'];
  const [currentOwner, setCurrentOwner] = useState(owner);
  const selectAvailable = select ? styles.selectAvailable : '';
  const [isSelected, setSelected] = useState(false);
  const selected = isSelected ? styles.selected : '';

  const style = {
    backgroundImage: `url(/images/${url})`,
    backgroundColor: currentOwner,
  };

  const flipOwner = () => {
    if (currentOwner === 'BLUE') {
      setCurrentOwner('RED');
    } else if (currentOwner === 'RED') {
      setCurrentOwner('BLUE');
    }
  };

  const cardClick = (evt) => {
    //flipOwner();
    if (select) {
      select(index);
      setSelected(true);
    } else {
      console.log(values, currentOwner);
    }
  };
  return (
    <div
      style={style}
      className={`${styles.container} ${selectAvailable} ${selected}`}
      onClick={cardClick}
      title={name}
    >
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
