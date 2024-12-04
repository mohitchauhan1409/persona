import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import App from './App';
import CreatePersona from './pages/CreatePersona';
import VideoUploader from './pages/videouploader/VideoUploader';
import ImageUploader from './pages/imageuploader/ImageUploader';
import AudioUploader from './pages/audiouploader/AudioUploader';
import DocumentUploader from './pages/documentuploader/DocumentUploader';

// Root Route
export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Index Route (Persona Main Screen)
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

// Create Persona Route
export const createPersonaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreatePersona,
});

// Video Uploader Route
export const videoUploaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video-upload',
  component: VideoUploader,
});

// Image Uploader Route
export const imageUploaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/image-upload',
  component: ImageUploader,
});

// Audio Uploader Route
export const audioUploaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/audio-upload',
  component: AudioUploader,
});

// Document Uploader Route
export const documentUploaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document-upload',
  component: DocumentUploader,
});

// Route Tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  createPersonaRoute,
  videoUploaderRoute,
  imageUploaderRoute,
  audioUploaderRoute,
  documentUploaderRoute,
]);