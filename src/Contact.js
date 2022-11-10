import React from 'react';
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from './useFetch';
import Cookies from 'universal-cookie';
import AccountNavbar from './AccountNavbar';
const Contact = () => {
    const[isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setdata] = useState([]);

    const cookies = new Cookies();
    const USERNAME = cookies.get('Name');
    const LASTNAME = cookies.get('LastName'); 
    
    useEffect(()=> {
        
            fetch("https://199a-5-28-186-8.eu.ngrok.io/getContact", {
                method:'POST',
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({USERNAME, LASTNAME})
            }) .then((res) =>{
                            if (!res.ok) {
                               throw Error("Data not found")
                            }
                            return res.json();
                        })
            .then(data => {
                setdata(data.Message); 
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false)
                setError(err.message)
            })
    
        },[])
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