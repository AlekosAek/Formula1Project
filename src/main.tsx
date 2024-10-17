import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { DriverProvider } from './Driverscontext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <DriverProvider>
     <RouterProvider router={router} />
   </DriverProvider>
  </StrictMode>,
)