import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Common/Login';
import UserLayout from './components/Layout/UserLayout';
import RootLayout from './components/Layout/RootLayout';
import AdminLayout from './components/Layout/AdminLayout';
import DashBoardLayout from './components/Layout/DashBoardLayout';
import SuperAdminLayout from './components/Layout/SuperAdminLayout';
import Home from './components/SuperAdmin/Home';
import Organizations from './components/SuperAdmin/Organizations';
import Admins from './components/SuperAdmin/Admins';
import Users from './components/SuperAdmin/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },
    ]
  },
  {
    path:'/dashboard',
    element:<DashBoardLayout/>,
    children:[
      {
        path:'user',
        element:<UserLayout/>,
        children:[
          {
            path:'',
            element:<div>HEllo</div>
          },
        ]
      },
      {
        path:'admin',
        element:<AdminLayout/>,
        children:[
          {
            path:'',
            element:<div>HEllo</div>
          },
        ]
      },
      {
        path:'super-admin',
        element:<SuperAdminLayout/>,
        children:[
          {
            path:'',
            element:<Home/>
          },
          {
            path:'organizations',
            element:<Organizations/>
          },
          {
            path:'admins-list',
            element:<Admins/>
          },
          {
            path:'users-list',
            element:<Users/>
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
