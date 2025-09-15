import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import AppError from './ui/AppError'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home'
import Onboard from './pages/Onboard'
import Insights from './pages/Insights'
import Customers from './pages/Customers'
import Orders from './pages/Orders'
import Clear from './pages/Clear'
import NotFound from './pages/NotFound'
import { AppProviders } from './state/providers'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <AppError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tenant/:tenantId/connect', element: <Onboard /> },
      { path: 'tenant/:tenantId/insights', element: <Insights /> },
      { path: 'tenant/:tenantId/customers', element: <Customers /> },
      { path: 'tenant/:tenantId/orders', element: <Orders /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/clear', element: <Clear /> },
  { path: '*', element: <NotFound /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
)
