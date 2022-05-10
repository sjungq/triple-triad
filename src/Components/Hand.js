import React from 'react';
import Card from './Card';
import styles from '../styles/Hand.module.css';

export default function Hand({ cards, owner }) {
  console.log('hand', cards);
  return (
    <div>
      <div>{owner} Cards</div>
      {cards.map((card, id) => {
        return <Card {...card} key={`${owner}${id}`} owner={owner} />;
      })}
    </div>
  );
}
