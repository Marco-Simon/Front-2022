import React from 'react';
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from './useFetch';
import Cookies from 'universal-cookie';
import AccountNavbar from './AccountNavbar';
const Contact = () => {
    const cookies = new Cookies();
    //NOTE: MUST ENTER URL AS PARAMETER FOR THE 'useFetch'!!!
    const { data, isPending, Error } =useFetch(' https://721d-80-246-130-214.eu.ngrok.io/getContact')
    
    var tableList =  
    <> <th className='dryTable'>Name:</th>
    <th className='dryTable'>Lastname:</th>
    <th className='dryTable'>Email:</th>
    <th className='dryTable'>Phone Number:</th></>;

    let trList = data.length > 0
    && data.map((item, i) => {
        return (
            // <option key={i} value={item}>#{item}</option>
            <tr id={i}>{Object.values(item).map((item1, j) => {
                return (
                    <td>{item1}</td>
                    )
                }, this)}<td></td></tr>
        )
    }, this);
    // <button id='cancel' value={i} onClick={()=>handleCancel(tableArray[i],i)}>Cancel
    // </button>
    return(
        <div>
            {!(cookies.get('isLoggedIn')=='true') && <Navigate to="/"/> }
            <AccountNavbar/>
            <table id='trTable'>
                <tr>{tableList}</tr>
                {trList}
            </table>
            {Error && <div> { Error } </div>}
            {isPending && <div> Loading...</div>}
        </div>
    )  
}
 
export default Contact;