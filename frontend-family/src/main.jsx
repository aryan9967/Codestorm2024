import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './Layout.jsx'
import HeartChart  from './components/LineChart/HeartChart'
import Tracking from './pages/Tracking'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Dashboard />} /> {/* Corrected this line */}
    <Route path='dashboard' element={<Dashboard />} />
    <Route path='heart' element={<HeartChart />} />
    <Route path='tracking' element={<Tracking />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
