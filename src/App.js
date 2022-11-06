import React from "react";
import ReactDOM from "react-dom/client";
// import './App.css';
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./RegisterPage";
import AboutPage from "./AboutPage";
import HomeNavbar from "./HomeNavbar";
import LoginPage from "./LoginPage";
import Account from "./Account";
import Payment from "./Payment"
import Contact from "./Contact"
import Logout from "./Logout";
import Manage from "./Manage";
import { useCookies } from "react-cookie";


function App() {
  const [cookies, setCookie] = useCookies(['cookie1']);
  
  setCookie('isLoggedIn',false, {      path: "/"    });
  setCookie('isManager',false, {      path: "/"    });

  return (
   <>
   <div>
  
   <BrowserRouter>
   
   
     <Routes>
       <Route path="/" element={<LoginPage />}/>
       <Route path="/RegisterPage" element={<RegisterPage />} />
       <Route path= "/AboutPage" element={ <AboutPage />}/>
       <Route path= "/Account" element={ <Account />}/>
       <Route path= "/Payment" element={ <Payment />}/>
       <Route path= "/Contact" element={ <Contact />}/>
       <Route path= "/Logout" element={ <Logout />}/>
       <Route path= "/Manage" element={ <Manage />}/>
       
     </Routes>
   </BrowserRouter>
   </div>
   </>
  );
}

export default App;
