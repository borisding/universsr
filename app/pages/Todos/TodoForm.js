import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextInput } from '@app/common/components';
import './TodoForm.module.scss';

const initialState = {
  isInvalid: false,
  todoInput: ''
};

export default function TodoForm(props) {
  const [isInvalid, setIsInvalid] = useState(initialState.isInvalid);
  const [todoInput, setTodoInput] = useState(initialState.todoInput);

  const styles = classNames('todo-input', { 'error-input': !!isInvalid });
  const placeholder = isInvalid ? 'Todo is required!' : 'Enter new todo...';

  function handleChange(evt) {
    setIsInvalid(initialState.isInvalid);
    setTodoInput(evt.target.value);
  }

  function handleBlur(evt) {
    if (isInvalid) {
      setIsInvalid(!isInvalid);
      setTodoInput(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (todoInput.trim() === '') {
      setIsInvalid(!initialState.isInvalid);
      setTodoInput(initialState.todoInput);
    } else {
      props.addTodo(todoInput);
      setIsInvalid(initialState.isInvalid);
      setTodoInput(initialState.todoInput);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="newTodo"
        value={todoInput}
        styleName={styles}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};
