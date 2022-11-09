import React from 'react';
import { useState, useEffect } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
const  RegisterPage= () => {
    const [username, setUsername] = useState('');
    const [lastName, setlastName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const[isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const[success, setSuccess]= useState(false)
   
    const [data, setdata] = useState({
		displayMessage: ""
	});
    const updateValues =()=>{    
        console.log("in function statement");
        setSuccess(true);
        setUsername('');
        setlastName('')
        setPassword1('');
        setPassword2('');
        setEmail('')
        setPhoneNumber('')
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const info = {username,lastName, password1,password2, email, phoneNumber};
        console.log();
        console.log(info);

        fetch("https://2417-80-246-130-214.eu.ngrok.io/register", {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(info)
        }) .then((res) =>{
                        if (!res.ok) {
                           throw Error("Data not found")
                        }
                        return res.json();
                    })
        .then(data => {
            setdata({
                displayMessage: data.Message
            }
            );
            if (data.Message == true){
                console.log("in IF statement");
                updateValues();
            } 
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false)
            setError(err.message)
        })
           
    }
    
    return (   
        <div id='signin'> 
        <HomeNavbar/>
        {error && <div> { error } </div>}
        {/* {isPending && <div id='loadSign'><p> Loading...</p> </div>} */}
        <form onSubmit={handleSubmit}>
             
            <br/>
            <br/>
            <label >Name:</label>
            <br />
            <input  type= "text" 
                id='username' 
                required
                value={username}
                onChange= {(e) => setUsername(e.target.value)} />
            <br/>
            <label >Last Name:</label>
            <br />
            <input  type= "text" 
                id='lastName' 
                required
                value={lastName}
                onChange= {(e) => setlastName(e.target.value)} />
            <br />
            <label >Password:</label>
            <br />
            <input  
                type= "password" 
                id='password1' 
                required
                value={password1}
                onChange= {(e) => setPassword1(e.target.value)}/>
            <br/>
            <label >Confirm Password:</label>
            <br />
            <input  
                type= "password" 
                id='password2' 
                required
                value={password2}
                onChange= {(e) => setPassword2(e.target.value)}/>
            <br/>
            <label >Phone Number:</label>
            <br />
            <input  
                type= "tel" 
                id='phoneNumber' 
                required
                pattern="[0-9]{9}"
                value={phoneNumber}
                onChange= {(e) => setPhoneNumber(e.target.value)}/>
            <br/>
            <label >Email:</label>
            <br />
            <input  
                type= "email" 
                id='email'
                required
                value={email}
                onChange= {(e) => setEmail(e.target.value)}/>
            <br/>
            <input type="submit" className='submit' value="Register"/>
        </form>

        <br/>
        <nav>
            <Link className = 'login' to="/">Have an account?  </Link> 
        </nav>
        {success?  
        <Navigate to="/Account "/> :
        <p id='correctionMessage'>{data.displayMessage}</p>
        }
        </div>
     )
}
 
export default RegisterPage;
 

