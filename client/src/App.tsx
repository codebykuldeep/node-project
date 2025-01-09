import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Common/Login';
import UserLayout from './components/Layout/UserLayout';
import RootLayout from './components/Layout/RootLayout';
import AdminLayout from './components/Layout/AdminLayout';

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
        element:<AdminLayout/>,
        children:[
          {
            path:'',
            element:<div>HEllo</div>
          },
        ]
      }
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
