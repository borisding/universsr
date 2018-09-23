import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageTitle, Loader } from '@common/components';
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

  renderTodos() {
    const { isFetching, actions, todos } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <Fragment>
        <TodoForm addTodo={actions.addTodo} />
        <hr />
        <TodoList todos={todos} updateTodo={actions.updateTodo} />
      </Fragment>
    );
  }

  render() {
    return (
      <PageTitle title="Todos">
        <h3>Todos Demo</h3>
        {this.renderTodos()}
      </PageTitle>
    );
  }
}

export default connect(
  state => ({ todos: state.todos.data, isFetching: state.todos.isFetching }),
  dispatch => ({ actions: bindActionCreators(todoActions, dispatch) })
)(TodosPage);
