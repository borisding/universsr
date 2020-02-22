import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './TodoList.module.scss';

function TodoList({ todos }) {
  const totalCompleted = todos.filter(todo => !!todo.completed).length;
  return (
    <div styleName="todos-container">
      <h3>{`Todo List (${totalCompleted} / ${todos.length})`}</h3>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span styleName={!todo.completed ? 'pending' : 'completed'}>
              {todo.title} (ID: {todo.id})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default memo(TodoList);
