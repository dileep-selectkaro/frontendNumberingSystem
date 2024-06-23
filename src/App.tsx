import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes,useNavigate, useLocation  } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import Loader from './common/Loader'; 
import Landing from "./components/Frontpage/Landing"



import {AuthProvider } from './js/auth/auth';
import {RequireAuth} from './js/auth/RequireAuth';

 import axios from 'axios' //${apiUrl}
import Marketlist from './components/Market/Marketlist';
import Addlist from "./components/Market/Addlist";
import Todayresult from "./components/Result/Todayresult";
import Resulthistory from "./components/Result/Resulthistory";
import ViewResult from "./components/Frontpage/ViewResult";



 

const verifyUrl= 'http://localhost:3005/user/verify';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const token= localStorage.getItem('token');
  const verify = async()=>{
   
      if(token==='undefined' || token===undefined || token=== null || !token ){
       return;
     }
    const requestBody={
       email:localStorage.getItem('email'),
       token:token
    }
    const requestConfig = {
      headers: {
        'token': localStorage.getItem('token'),
        'uu_id': localStorage.getItem('uuID')
  
      }
    }
   await axios.post(verifyUrl,requestBody,requestConfig).then(response=>{
    }).catch(error=>{
      localStorage.clear();
      console.log(error)
        })

  }

  useEffect(() => {
    if( (token=== null) &&(window.location.href.split("?time_samp=")[1] ==undefined)){
       navigate('/landing') 
        
        }
  
      
    setTimeout(() => setLoading(false), 1000);
    
   
  }, []);

 
  useEffect(() => {
    verify()
     
  }, [location]);
  return loading ? (
    <Loader />
  ) : (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      /> 
       <AuthProvider>
       <Routes>
  
       <Route path="landing" element={  <Landing/>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
       
          <Route path='/ecommerce' index element={<ECommerce />} /> 
          <Route path='/marketlist' element={<RequireAuth><Marketlist/></RequireAuth>}></Route>
          <Route path='/addlist' element={<RequireAuth><Addlist/></RequireAuth>}></Route>
          <Route path='/todayresult' element={<RequireAuth><Todayresult/></RequireAuth>}></Route>
          <Route path='/resulthistory' element={<RequireAuth><Resulthistory/></RequireAuth>}></Route>
          <Route path='/viewresult' element={<RequireAuth><ViewResult/></RequireAuth>}></Route>
         
      </Routes>
       </AuthProvider>
      
    </>
  );
}

export default App;
