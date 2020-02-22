import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { todosActions } from '@client/redux/modules/todos';
import { PageContainer, Loader } from '@client/common/components';
import TodoList from './TodoList';

export function Todos({ todos, isFetching }) {
  if (isFetching) {
    return <Loader />;
  }

  return (
    <PageContainer title="Todos">
      <TodoList todos={todos} />
    </PageContainer>
  );
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos.data,
  isFetching: state.todos.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(todosActions, dispatch)
});

const FrontloadTodos = frontloadConnect(
  async ({ actions, todos, isFetching }) => {
    if (!isFetching && todos.length === 0) {
      await actions.fetchTodos();
    }
  }
)(React.memo(Todos));

export default connect(mapStateToProps, mapDispatchToProps)(FrontloadTodos);
