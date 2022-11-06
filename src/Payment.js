import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from './useFetch';
import Cookies from 'universal-cookie';
import AccountNavbar from './AccountNavbar';
const Payment = () => {
    //NOTE: MUST ENTER URL AS PARAMETER FOR THE 'useFetch'!!!
    const cookies = new Cookies();
    const { data, isPending, Error } =useFetch('')
    return(
        <div>

            {!(cookies.get('isLoggedIn')=='true') && <Navigate to="/"/> }
            <AccountNavbar/>
            {Error && <div> { Error } </div>}
            {isPending && <div> Loading...</div>}
        </div>
    )
}
 
export default Payment;