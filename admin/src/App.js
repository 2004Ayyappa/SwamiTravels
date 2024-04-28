import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
// import CityForm from "./components/CityForm";
// import CityList from "./components/CityManagement";

import SignIn from "./components/Signin";
// import Navigation from "./components/Navigation";
import SignUp from "./components/Signup";
import BusManagement from "./components/BusManagement";
import DashboardLayout from "./components/DashboardLayout";
import Error from "./components/Error";
import UserManagement from "./components/UserManagement";
import CityManagement from "./components/CityManagement";
import Dashboard from "./components/dashboard";
import BusForm from "./components/BusForm";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          
      
   
      </header>
      <div className="App-body">
       
      
      <BrowserRouter>
     
      <Routes>
        
        <Route path='/' element={<SignIn/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboardlayout' element={<DashboardLayout/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/citymanagement" element={<CityManagement />} />
        <Route path="/busmanagement" element={<BusManagement/>} />
        <Route path="/allbuses" element={<BusForm/>} />
        <Route path="/usermanagement" element={<UserManagement/>} />
        <Route path="*"  element={<Error/>} />
       
      </Routes>
     
    </BrowserRouter>
    
            </div>
            
    </div>

  );
}



export default App;
