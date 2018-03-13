import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageTitle } from '@common/components';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import * as todoActions from './actions';

class TodosPage extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  componentDidMount() {
    const { isFetching, todos, actions } = this.props;

    if (!isFetching && todos.length === 0) {
      return actions.fetchTodos();
    }
  }

  render() {
    const { actions, todos } = this.props;

    return (
      <PageTitle title="Todos">
        <div>
          <h3>Todos Demo</h3>
          <TodoForm addTodo={actions.addTodo} />
          <hr />
          <TodoList updateTodo={actions.updateTodo} todos={todos} />
        </div>
      </PageTitle>
    );
  }
}

export default withRouter(
  connect(
    state => ({ isFetching: state.isFetching, todos: state.todos }),
    dispatch => ({ actions: bindActionCreators(todoActions, dispatch) })
  )(TodosPage)
);
