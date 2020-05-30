import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoList.module.scss';

export default function TodoList({ todos }) {
  const totalCompleted = todos.filter(todo => !!todo.completed).length;
  return (
    <div className={styles.todosContainer}>
      <h3>{`Todo List (${totalCompleted} / ${todos.length})`}</h3>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              className={!todo.completed ? styles.pending : styles.completed}
            >
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
