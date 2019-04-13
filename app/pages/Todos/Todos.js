import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { todosActions } from '@app/redux/ducks/todos';
import { PageWrapper, PageLoader } from '@app/layout';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export class Todos extends PureComponent {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  componentDidMount() {
    this.props.actions.prefetchTodos();
  }

  renderTodos = () => {
    const { isFetching, actions, todos } = this.props;

    if (isFetching) {
      return <PageLoader />;
    }

    return (
      <>
        <TodoForm addTodo={actions.addTodo} />
        <hr />
        <TodoList todos={todos} updateTodo={actions.updateTodo} />
      </>
    );
  };

  render() {
    return (
      <PageWrapper title="Todos">
        <h3>Todos Demo</h3>
        {this.renderTodos()}
      </PageWrapper>
    );
  }
}

export default connect(
  state => ({ todos: state.todos.data, isFetching: state.todos.isFetching }),
  dispatch => ({ actions: bindActionCreators(todosActions, dispatch) })
)(Todos);
