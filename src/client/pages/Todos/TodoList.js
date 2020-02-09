import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@client/common/components';
import './TodoList.module.scss';

export default function TodoList({ todos, updateTodo }) {
  const isTruthy = value => value === true;
  const totalDone = todos.filter(todo => isTruthy(todo.done)).length;

  return (
    <div styleName="todos-container">
      <h3>{`My Todos (${totalDone} / ${todos.length})`}</h3>
      <ul>
        {todos.map(record => (
          <li key={record.id}>
            <label htmlFor={record.id}>
              <Checkbox
                id={record.id}
                value={record.id}
                onChange={evt => updateTodo(evt.target)}
                isChecked={isTruthy(record.done)}
              />
              <span styleName={!record.done ? 'pending' : 'done'}>
                {record.todo}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      todo: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    })
  ).isRequired,
  updateTodo: PropTypes.func.isRequired
};
