import { FrontloadProvider } from 'react-frontload';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from './components';
import helmet from './static/helmet';
import Home from './pages/Home';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import styles from './App.module';

export default function App({ frontloadState }) {
  const activeClassName = ({ isActive }) => {
    return isActive ? styles.active : null;
  };

  return (
    <FrontloadProvider initialState={frontloadState}>
      <div className={styles.container}>
        <Helmet {...helmet} />
        <header>
          <nav className={styles.menu}>
            <ul>
              <li>
                <NavLink to="/" className={activeClassName}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/todos" className={activeClassName}>
                  Todos
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.content}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </FrontloadProvider>
  );
}
