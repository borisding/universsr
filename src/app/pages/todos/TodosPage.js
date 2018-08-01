import React, { Component, Fragment } from 'react';
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
    this.props.actions.prefetchTodos();
  }

  render() {
    const { actions, todos } = this.props;

    return (
      <PageTitle title="Todos">
        <Fragment>
          <h3>Todos Demo</h3>
          <TodoForm addTodo={actions.addTodo} />
          <hr />
          <TodoList updateTodo={actions.updateTodo} todos={todos} />
        </Fragment>
      </PageTitle>
    );
  }
}

export default withRouter(
  connect(
    state => ({ todos: state.todos }),
    dispatch => ({ actions: bindActionCreators(todoActions, dispatch) })
  )(TodosPage)
);
