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
import Cadastro from './pages/cadastro/cadastro.tsx'
import CadastroSensor from './pages/cadastroSensor/CadastroSensor.tsx'
import DashBoards from './pages/dashboards/Dashboards.tsx'
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={SharedComponents}>
      <Route index={true} Component={Inicial}/>
      <Route path='sensores' Component={Sensores}/>
      <Route path='sensores/addSensor' Component={CadastroSensor}/>
      <Route path='login' Component={Login}/>
      <Route path='cadastro' Component={Cadastro}/>
      <Route path='dashboards' Component={DashBoards}/>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(

    <RouterProvider router={appRouter}/>

)