import React from 'react';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useFetch from './useFetch';
const Logout = () => {
    const[success, setSuccess]= useState(false)
    //NOTE: MUST ENTER URL AS PARAMETER FOR THE 'useFetch'!!!
    const { data, isPending, Error } =useFetch('/logout');
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(()=>{
        if (data == true){           
        console.log("in IF statement");
        setSuccess(true);
    } 
    })
    useEffect(()=>{
        if(success == true) {setCookie('isLoggedIn', false); removeCookie('isManager')}
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