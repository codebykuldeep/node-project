import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Common/AuthPage/Login';
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
import OrganizationPage from './components/Admin/OrganizationPage';
import Logout from './components/Common/Logout';
import OrgUpdateForm from './components/Admin/Form/OrgUpdateForm';
import OrgUsers from './components/Admin/OrgUsers';
import Transactions from './components/Admin/Transactions/Transactions';
import PendingTransactions from './components/Admin/Transactions/PendingTrasactions';
import AddUser from './components/Admin/Form/AddUser';
import Account from './components/Admin/Account';
import UserTransactions from './components/User/Transactions/UserTransactions';
import Withdrawal from './components/User/Transactions/Withdrawal';
import WithdrawPage from './components/User/Transactions/WithdrawPage';
import OrganizationDetail from './components/SuperAdmin/DetailPage/Organization/OrganizationDetail';
import AdminDetail from './components/SuperAdmin/DetailPage/Admin/AdminDetail';
import UserDetail from './components/SuperAdmin/DetailPage/UserPage/UserDetail';
import CalenderSection from './components/User/Calender/CalendarSection';
import Withdrawals from './components/Admin/Transactions/Withdrawals';


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
          {
            path:'calendar',
            element:<CalenderSection/>
          },
          {
            path:'transactions',
            element:<UserTransactions/>
          },
          {
            path:'withdrawal',
            element:<Withdrawal/>
          },
          {
            path:'withdraw',
            element:<WithdrawPage/>
          },
          {
            path:'account',
            element:<Account/>
          },
          {
            path:'logout',
            element:<Logout/>
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
            path:'users-list/:id',
            element:<UserDetail/>
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
            path:'withdrawals',
            element:<Withdrawals/>
          },
          {
            path:'account',
            element:<Account/>
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
            element:<OrganizationDetail/>
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
            path:'admins-list/:id',
            element:<AdminDetail/>
          },
          {
            path:'users-list',
            element:<Users/>
          },
          {
            path:'users-list/:id',
            element:<UserDetail/>
          },
          {
            path:'account',
            element:<Account/>
          },
          {
            path:'logout',
            element:<Logout/>
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
