import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextInput } from '@app/common/components';
import './styles/TodoForm.module.scss';

const initialState = {
  todoInput: '',
  isInvalid: false
};

export default class TodoForm extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = evt => {
    this.setState({
      todoInput: evt.target.value,
      isInvalid: initialState.isInvalid
    });
  };

  handleBlur = evt => {
    if (this.state.isInvalid) {
      this.setState({
        todoInput: evt.target.value,
        isInvalid: !this.state.isInvalid
      });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { todoInput } = this.state;

    if (todoInput.trim() === '') {
      return this.setState({
        todoInput,
        isInvalid: !initialState.isInvalid
      });
    }

    this.props.addTodo(todoInput);
    this.setState(initialState);
  };

  render() {
    const { todoInput, isInvalid } = this.state;
    const styles = classNames('todo-input', { 'error-input': !!isInvalid });
    const placeholder = isInvalid ? 'Todo is required!' : 'Enter new todo...';

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          name="newTodo"
          value={todoInput}
          styleName={styles}
          placeholder={placeholder}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </form>
    );
  }
}
