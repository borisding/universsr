import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@common/components/Checkbox';
import styles from '@modules/todos/TodoList.scss';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        todo: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
      })
    ).isRequired
  };

  isTruthy(value) {
    return value === true;
  }

  getTodos() {
    const { todos, updateTodo } = this.props;
    const totalDone = todos.filter(todo => this.isTruthy(todo.done)).length;

    return (
      <div className="list">
        <h3>{`My Todos (${totalDone} / ${todos.length})`}</h3>
        <ul>
          {todos.map(record => (
            <li key={record.id}>
              <label htmlFor={record.id}>
                <Checkbox
                  id={record.id}
                  value={record.id}
                  onChange={evt => updateTodo(evt.target)}
                  isChecked={this.isTruthy(record.done)}
                />
                <span className={!record.done ? styles.pending : styles.done}>
                  {record.todo}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    if (this.props.todos.length === 0) {
      return <span className="no-todos">No todo created so far.</span>;
    }

    return this.getTodos();
  }
}