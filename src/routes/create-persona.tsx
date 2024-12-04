import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import CreatePersona from '../pages/CreatePersona';

export const createPersonaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreatePersona,
});