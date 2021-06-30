import React from 'react';
import logo from '../../../assets/images/logo.png';
import { PageContainer } from '../../components';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <PageContainer title="Home">
      <div className={styles.logo}>
        <img src={logo} alt="React Redux Boilerplate" />
      </div>
      <p className={styles.lead}>
        universsr is <strong>universal</strong> React-Redux starter kit.
      </p>
      <br />
      <a
        href="https://github.com/borisding/universsr"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub repository
      </a>
    </PageContainer>
  );
}
