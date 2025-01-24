import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './ComponentsStyle/FormStyle.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Components/Profile';
import Search from './Components/Search';
import FreeLancerProfile from './Components/FreeLancerProfile';
import Orders from './Components/Orders';
import RequestPage from './Components/RequestPage';
import About from './Components/About'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51Qki3JCTFACjR68uzZq4NRHk8iFMm0OHTmm2qG68n22Rw89QmPNa2tPuThN96AQpLO7puzEGuqJo5xVkGKVeaIL3008HZ3EOjv');
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div >
        <Nav />
        <Home />
      </div>
    ),
  },
  {
    path: "/request",
    element: (
      <div className="pt-5">
        <Nav/>
        
          <Elements stripe={stripePromise}>
      <RequestPage />
    </Elements>
      </div>
    ),
  },

  {
    path:"/orders",
    element:<Orders/>
  },


  {
    path: "/some",
    element: (
      <div>
        <Nav />

        <FreeLancerProfile />
      </div>
    ),
  },
  {
    path: "/signup",
    element:
      <div className="pt-5">
        <Nav/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <SignUp />
      </div>

  },
  {
    path: "/login",
    element: (
      <div className="pt-5">
        <Nav />
        <br/>
        <Login />
      </div>
    ),
  },
  {
    path: "*", 
    element: <div>Page Not Found</div>,
  },
  {
    path: "/profile",
    element: <div>
      <Nav />
      <Profile />
    </div>
  },
  {
    path: "/search",
    element: <div>
      <Nav />
      <Search />
    </div>
  },

  {
    path: "/about",
    element: <div className="pt-5 ">
      <Nav />
      <br/>
      <br/>
      <br/>
    
      <About className="my-5"/>
    </div>
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
