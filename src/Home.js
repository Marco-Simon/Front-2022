import React from 'react';
import user from './user-avatar.png';
import purchase from './buy icon.jpg';
import HomeNavbar from "./HomeNavbar";
import {Outlet, Link } from 'react-router-dom';


const Home = () => {
    return ( 
        <div className="home">
            <HomeNavbar/>
            <div id="middle">
            <nav>
            <Link to="/RegisterPage">
                <img src={user} alt="Login in/ Register image "/>
                <span className="description">Login/Register</span>
            </Link> 

            <Link to="/AboutPage">
                <img src={purchase}  alt="Purchase System"/>
                <span className="description">Purchase Systems</span>
            </Link>
        </nav>
        <Outlet/>
        </div>
            <br/>
            
        </div>
     );
}
 
export default Home;