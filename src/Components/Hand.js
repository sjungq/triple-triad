import React from 'react';
import Card from './Card';
import styles from '../styles/Hand.module.css';

export default function Hand({
  cards,
  owner,
  setActiveCard,
  selectedCard,
  maxCards,
}) {
  //console.log('hand', cards);

  const selectAvailableStyle = setActiveCard ? styles.selectAvailable : '';

  return (
    <div>
      <div className={styles.cardContainer}>
        {cards.map((card, id) => {
          if (card) {
            return (
              <button
                className={
                  `${styles.cardButton} ${selectAvailableStyle} ` +
                  (selectedCard === id ? styles.isSelected : '')
                }
                key={`${owner}${id}btn`}
              >
                <Card
                  {...card}
                  key={`${owner}${id}`}
                  owner={owner}
                  setActiveCard={setActiveCard}
                  index={id}
                />
              </button>
            );
          } else {
            return (
              <button className={`${styles.emptySlot}`}>
                <div></div>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}

Hand.defaultProps = {
  maxCards: 5,
};
