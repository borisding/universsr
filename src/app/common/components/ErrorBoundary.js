import React, { Component } from 'react';
import { DEV } from '@config';

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
      <div>
        <h3>Sorry! An error occured while rendering page.</h3>
        {DEV && (
          <pre>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </pre>
        )}
      </div>
    );
  }
}
