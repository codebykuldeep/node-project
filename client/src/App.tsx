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
import OrganizationForm from './components/SuperAdmin/form/OrganizationForm';
import AdminForm from './components/SuperAdmin/form/AdminForm';
import OrgDetail from './components/SuperAdmin/UI/OrgDetail';
import OrganizationPage from './components/Admin/OrganizationPage';
import Logout from './components/Admin/Logout';
import OrgUpdateForm from './components/Admin/Form/OrgUpdateForm';
import OrgUsers from './components/Admin/OrgUsers';
import Transactions from './components/Admin/Transactions/Transactions';
import PendingTransactions from './components/Admin/Transactions/PendingTrasactions';
import AddUser from './components/Admin/Form/AddUser';

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
          {
            path:'organization',
            element:<OrganizationPage/>
          },
          {
            path:'update',
            element:<OrgUpdateForm/>
          },
          {
            path:'users-list',
            element:<OrgUsers/>
          },
          {
            path:'users-list/add',
            element:<AddUser/>
          },
          {
            path:'transactions',
            element:<Transactions />
          },
          {
            path:'pending',
            element:<PendingTransactions/>
          },
          {
            path:'account',
            element:<div>Account</div>
          },
          {
            path:'logout',
            element:<Logout/>
          }
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
            path:'organizations/add',
            element:<OrganizationForm/>
          },
          {
            path:'organizations/:id',
            element:<OrgDetail/>
          },
          {
            path:'admins-list',
            element:<Admins/>
          },
          {
            path:'admins-list/add',
            element:<AdminForm/>
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
