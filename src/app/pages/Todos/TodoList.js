import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@common/components';
import './styles/TodoList.module.scss';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        todo: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
      })
    ).isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  isTruthy(value) {
    return value === true;
  }

  render() {
    const { todos, updateTodo } = this.props;
    const totalDone = todos.filter(todo => this.isTruthy(todo.done)).length;

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
                  isChecked={this.isTruthy(record.done)}
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
}
