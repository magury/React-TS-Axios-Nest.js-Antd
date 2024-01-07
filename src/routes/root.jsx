import {
  Navigate
} from "react-router-dom";
import Login from '../components/Login/index'
import Patient from '../components/patientInfo/index'
import Customer from '../components/tab/customer'
import { Empty } from "antd";
import BadCustomer from '../components/tab/badCustomer'
import OrderList from '../components/tab/order'
import Dictionary from '../components/tab/dictionary'
import Addition from '../components/tab/addition'
import List from '../components/tab/list'
import Look from '../components/tab/lookList'
import Chat from '../components/chat'
import Detail from '../components/detail'
import Introduce from '../components/detail/introduce'
import Depart from '../components/detail/depart'
import Popular from '../components/detail/popular'
import Experience from '../components/detail/experience'
export default  [
    {
        path: '/login',
        element:<Login/>
  },
  {
    path: '/',
    element: <Navigate to='/detail' />,
  },
  {
     path: '/chat',
    element:<Chat/>
  },
  {
    path: '/detail',
    element: <Detail />,
    children: [
      {
         path: '',
        element:<Empty style={{minHeight:'500px',marginTop:50}} />
      },
      {
        path: 'introduce',
        element:<Introduce/>
      },
      {
        path: 'depart',
        element:<Depart/>
      },
      {
        path: 'popular',
        element:<Popular/>
      },
      {
        path: 'experience',
        element:<Experience/>
      }
    ]
  },
  {
    path: '/patient',
    element: <Patient />,
    children: [
      {
         path: 'info',
        element: <Customer />,
      }, 
      {
         path: '',
        element:<Empty style={{minHeight:'500px'}} />
      }, 
      {
        path: 'bad/info',
        element:<BadCustomer/>
      }, 
      {
        path: 'order/list',
        element:<OrderList/>
      }
      , 
      {
        path: 'dictionary',
        element:<Dictionary/>
      },
      {
        path: 'addition',
        element:<Addition/>
      }, {
        path: 'list',
        element:<List/>
      },
      {
        path: 'look',
        element:<Look/>
      }
    ]
  }
]