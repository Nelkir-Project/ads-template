import { Outlet, createRootRoute } from '@tanstack/react-router'
import { VideoManagerProvider } from '../contexts/VideoManagerContext'

export const Route = createRootRoute({
  component: () => (
    <VideoManagerProvider>
      <Outlet />
    </VideoManagerProvider>
  ),
})
