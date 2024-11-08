import '../public/global.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
 } from 'react-router-dom'
import Inicial from './pages/inicial/inicial.tsx'
import Sensores from './pages/sensores/sensores.tsx'
import SharedComponents from './pages/sharedComponents/shared.tsx'
import Login from './pages/login/login.tsx'
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={SharedComponents}>
      <Route index={true} Component={Inicial}/>
      <Route path='sensores' Component={Sensores}/>
      <Route path='login' Component={Login}/>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)