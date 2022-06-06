import React from 'react';
import Card from './Card';
import styles from '../styles/Hand.module.css';

export default function Hand({ cards, owner, setActiveCard, selectedCard }) {
  //console.log('hand', cards);

  const selectAvailableStyle = setActiveCard ? styles.selectAvailable : '';

  return (
    <div>
      <div className={styles.cardContainer}>
        {cards.map((card, id) => {
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
        })}
      </div>
    </div>
  );
}
