import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NhostProvider } from '@nhost/react'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { nhost } from './lib/nhost'
import TaskPage from './pages/TaskPage.jsx'
import NhostStatus from './components/NhostStatus.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/taskDetails',
    element: <TaskPage />,
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
        <RouterProvider router={router}/>
        <NhostStatus />
    </NhostProvider>
  </StrictMode>
)
