import React from 'react';
import logo from '@assets/images/logo.png';
import { Container } from '@client/common/components';
import './Home.module.scss';

export default function Home() {
  return (
    <Container title="Home">
      <div styleName="logo">
        <img src={logo} alt="React Redux Boilerplate" />
      </div>
      <p styleName="lead">
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
    </Container>
  );
}
