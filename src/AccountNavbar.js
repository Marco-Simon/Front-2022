import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, Link, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const AccountNavbar = () => {
    const cookies = new Cookies();
    return (        
        <div>
            {!(cookies.get('isLoggedIn')=='true') && <Navigate to="/"/> }
            <nav id="nav2">
                <Link className="home" to="/Logout"> Log Out </Link>
                <Link id="account" to="/Account"> Account </Link>
                <Link id="payment" to="/Payment"> Payment </Link>
                <Link id="contact" to="/Contact"> Contact </Link>
                {cookies.get('isManager') && <Link id="manage" to="/Manage"> Manage </Link> }
            </nav>
            
        </div>

     );
}
 
export default AccountNavbar;