import React from 'react';
import Alert from 'react-s-alert';
import logo from '@app/assets/images/logo.png'; // example of import assets image
import { Container } from '@app/common/components';
import './Home.module.scss';

export default function Home() {
  function onClick() {
    Alert.info('Hello! This is universal React + Redux demo site.');
  }

  return (
    <Container title="Home">
      <div styleName="logo">
        <img src={logo} alt="React Redux Boilerplate" />
      </div>
      <p styleName="lead">
        universsr is <strong>universal</strong> React-Redux starter kit.
      </p>
      <div>
        <button styleName="btn-alert" onClick={onClick}>
          Show alert
        </button>
        {' or, go to '}
        <a
          href="https://github.com/borisding/universsr"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub repository
        </a>
      </div>
    </Container>
  );
}
