import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders correctly', () => {
    const props = { children: ['<div>child</div>'] };
    const tree = renderer
      .create(
        <MemoryRouter>
          <ErrorBoundary {...props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
