import React from 'react';
import Card from './Card';
import styles from '../styles/Hand.module.css';

export default function Hand({ cards, owner, selectCard, selectedCard }) {
  //console.log('hand', cards);
  return (
    <div>
      <div>{owner} Cards</div>
      <div className={styles.cardContainer}>
        {cards.map((card, id) => {
          return (
            <Card
              {...card}
              key={`${owner}${id}`}
              owner={owner}
              selectCard={selectCard}
              index={id}
              isSelected={selectedCard === id}
            />
          );
        })}
      </div>
    </div>
  );
}
