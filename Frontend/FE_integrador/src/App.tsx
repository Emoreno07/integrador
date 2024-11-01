import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider} from 'react-router-dom';
import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import '../public/global.css';
import Login from './pages/login';
import MainPage from './pages/main';
const App = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index={true} element={<MainPage/>}/>
      <Route path='login' element={<Login/>}/>
    </Route> 
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={App}/>
  </StrictMode>,
)