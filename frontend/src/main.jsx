import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './Home.jsx';
import Register from './Register.jsx';
import Login from './login.jsx';
import ProductAdd from './ProductAdd.jsx';
import Userread from './Userread.jsx';
import Productinfo from './Produnctinfo.jsx';
import Adminread from './Adminread.jsx';
import Updata from './Updata.jsx';
import Adminregister from './Adminregister.jsx';
import Adminlogin from './Adminlogin.jsx';
import From from './From.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/AddProduct",
    element: <ProductAdd/>,
  },
  {
    path: "/UserRead",
    element: <Userread/>,
  },
  {
    path: "/Productinfo/:id",
    element: <Productinfo/>,
  },
  {
    path: "/Adminread",
    element: <Adminread/>,
  },
  {
    path: "/Adminregister",
    element: <Adminregister/>,
  },
  {
    path: "/Adminlogin",
    element: <Adminlogin/>,
  },
  {
    path: "/Updata/:id",
    element: <Updata/>,
  },
  {
    path: "/from",
    element:<From/> ,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router} />
  </StrictMode>,
)
