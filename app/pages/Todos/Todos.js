import React from 'react';
import { useFrontload } from 'react-frontload';
import { PageContainer, Loader } from '../../components';
import TodoList from './TodoList';

export default function Todos() {
  const { data: todos, frontloadMeta } = useFrontload(
    'todos',
    async ({ api }) => {
      const todos = await api.fetchTodos();
      return todos;
    }
  );

  if (frontloadMeta.pending) {
    return <Loader />;
  }

  return (
    <PageContainer title="Todos">
      <TodoList todos={todos} />
    </PageContainer>
  );
}
