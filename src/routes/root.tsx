import { createRootRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: () => (
    <div className="app-root">
      <Outlet />
    </div>
  ),
});