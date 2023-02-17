import Page from '../Page';
import { useStaticRouterContext } from '../../context';

export default function NotFound() {
  const staticContext = useStaticRouterContext();
  staticContext.statusCode = 404;

  return (
    <Page title="Not Found">
      <h3>404 - Page Not Found.</h3>
    </Page>
  );
}
