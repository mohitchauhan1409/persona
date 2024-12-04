import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import VideoUploader from '../pages/videouploader/VideoUploader';

export const videoUploaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-upload',
  component: VideoUploader,
});