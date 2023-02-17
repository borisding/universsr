import { useFrontload } from 'react-frontload';
import Page from '../Page';
import TodoList from './TodoList';
import { Loader } from '../../components';

export default function Todos() {
  const { data: todos, frontloadMeta } = useFrontload(
    'todos',
    async ({ api }) => {
      const { data } = await api.fetchTodos();
      return data;
    }
  );

  if (frontloadMeta.pending) {
    return <Loader />;
  }

  if (frontloadMeta.error) {
    return <div>Failed to fetch data!</div>;
  }

  return (
    <Page title="Todos">
      <TodoList todos={todos} />
    </Page>
  );
}
