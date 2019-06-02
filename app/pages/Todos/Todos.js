import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { todosActions } from '@app/redux/modules/todos';
import { Loader } from '@app/common/components';
import PageWrapper from '../PageWrapper';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export function Todos({ actions, todos, isFetching }) {
  if (isFetching) {
    return <Loader />;
  }

  return (
    <PageWrapper title="Todos">
      <h3>Todos Demo</h3>
      <TodoForm addTodo={actions.addTodo} />
      <hr />
      <TodoList todos={todos} updateTodo={actions.updateTodo} />
    </PageWrapper>
  );
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  todos: state.todos.data,
  isFetching: state.todos.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(todosActions, dispatch)
});

const FrontloadTodos = frontloadConnect(async ({ actions, todos }) => {
  if (todos.length === 0) return await actions.fetchTodos();
})(Todos);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontloadTodos);
