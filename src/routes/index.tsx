import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import App from '../App';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});