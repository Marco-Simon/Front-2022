import React from 'react';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useFetch from './useFetch';
const Logout = () => {
    const[success, setSuccess]= useState(false)
    //NOTE: MUST ENTER URL AS PARAMETER FOR THE 'useFetch'!!!
    const { data, isPending, Error } =useFetch('https://de7e-5-28-186-203.eu.ngrok.io/logout');
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(()=>{
        if (data == true){           
        console.log("in IF statement");
        setSuccess(true);
    } 
    })
    useEffect(()=>{
        console.log('success = ', success);
        if(success == true) {
        setCookie('isLoggedIn', false); 
        removeCookie('isManager');
        removeCookie('Name');
        removeCookie('LastName')}
    },[success])
    
    return(
        <div>
            {Error && <div> { Error } </div>}
            {isPending && <div> Loading...</div>}
            {success && <Navigate to="/"/> }
        </div>
    );
}
 
export default Logout;