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
    <div className={styles.cardContainer}>
      {cards.map((card, id) => {
        return (
          <div className={styles.cardHandSlot} key={`${owner}SLOT${id}`}>
            <button
              className={
                `${styles.cardButton} ${selectAvailableStyle} ` +
                (selectedCard === id ? styles.isSelected : '')
              }
              key={`${owner}${id}btn`}
            >
              {card ? (
                <Card
                  {...card}
                  key={`${owner}${id}`}
                  owner={owner}
                  setActiveCard={setActiveCard}
                  index={id}
                />
              ) : (
                ''
              )}
            </button>
            <div className={styles.handEmptySlot}></div>
          </div>
        );
      })}
    </div>
  );
}

Hand.defaultProps = {
  maxCards: 5,
};
