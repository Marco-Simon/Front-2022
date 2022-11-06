import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, Link } from "react-router-dom";


const HomeNavbar = () => {
    return (        
        <div>
            <nav id = 'nav1'>
                {/* <Link className="home" to="/"> Home </Link> */}
                <Link className ="login" to="/"> Login  </Link>
                <Link id="about" to="/AboutPage"> About  </Link>
            </nav>
            
        </div>

     );
}
 
export default HomeNavbar;