import React from 'react';
import Card from './Card';
import styles from '../styles/Hand.module.css';

export default function Hand({ cards, owner, select }) {
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
              select={select}
              index={id}
            />
          );
        })}
      </div>
    </div>
  );
}
