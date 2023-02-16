import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Todos from '../Todos';

jest.mock('react-frontload', () => ({
  useFrontload: () => ({ data: [], frontloadMeta: {} })
}));

describe('Todos', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <HelmetProvider>
            <Todos />
          </HelmetProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
