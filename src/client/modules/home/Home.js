import React from 'react';
import logo from '@assets/images/logo.png'; // example of import assets image
import './styles/Home.scss';

export default () => {
  return (
    <div>
      <div styleName="logo">
        <img src={logo} alt="React Redux Boilerplate" />
      </div>
      <p styleName="lead">
        <span>
          universsr is <strong>universal</strong> React-Redux boilerplate.
        </span>
        {' | '}
        <a href="https://github.com/borisding/universsr">GitHub Repo</a>
      </p>
    </div>
  );
};
