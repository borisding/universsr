import React, { Component } from 'react';
import { env } from '../../utils';

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (!this.state.errorInfo) {
      return this.props.children;
    }

    return (
      <>
        <h3>Sorry! An error occured while rendering page.</h3>
        {env.isDev && (
          <pre>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </pre>
        )}
      </>
    );
  }
}
