import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '@common/components/TextInput';
import './styles/TodoForm.scss';

const initialState = {
  todoInput: '',
  isInvalid: false
};

export default class TodoForm extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      todoInput: evt.target.value,
      isInvalid: initialState.isInvalid
    });
  }

  handleBlur(evt) {
    if (this.state.isInvalid) {
      this.setState({
        todoInput: evt.target.value,
        isInvalid: !this.state.isInvalid
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { todoInput } = this.state;

    if (todoInput.trim() === '') {
      return this.setState({
        todoInput,
        isInvalid: !initialState.isInvalid
      });
    }

    return this.props
      .addTodo(todoInput)
      .then(() => this.setState(initialState));
  }

  render() {
    const { todoInput, isInvalid } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          name="newTodo"
          value={todoInput}
          styleName={'todo-input' + (isInvalid ? ' error-input' : '')}
          placeholder={isInvalid ? 'Todo is required!' : 'Enter new todo...'}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </form>
    );
  }
}
