import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import * as todoActions from '@redux/todos/actions';

class TodosPage extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  componentDidMount() {
    if (this.props.todos.length === 0) {
      return this.props.actions.fetchTodos();
    }
  }

  render() {
    const { actions, todos } = this.props;

    return (
      <div>
        <h3>Todos Demo</h3>
        <TodoForm addTodo={actions.addTodo} />
        <hr />
        <TodoList updateTodo={actions.updateTodo} todos={todos} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ todos: state.todos }),
    dispatch => ({ actions: bindActionCreators(todoActions, dispatch) })
  )(TodosPage)
);
