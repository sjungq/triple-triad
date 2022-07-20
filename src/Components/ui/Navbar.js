import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
export default function Navbar() {
  return (
    <nav className={styles.container}>
      <a href='/' className={styles.title}>
        Triple Triad
      </a>
      <ul>
        <li>Rules</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
