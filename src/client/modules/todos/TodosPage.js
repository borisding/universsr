import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as todoActions from '@redux/todos/actions';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

class TodosPage extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  static fetchData(match) {
    // TODO: invoke fetching action
  }

  componentDidMount() {
    TodosPage.fetchData();
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
