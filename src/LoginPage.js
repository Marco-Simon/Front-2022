import React from 'react';
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomeNavbar from "./HomeNavbar";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[isPending, setIsPending] = useState(true);
    
    const[success, setSuccess]= useState(false)
    const [error, setError] = useState(null);
    const [data, setdata] = useState('');
    const [cookies, setCookie] = useCookies(['cookie1']);
    const [manager, setManager] = useState('');
    const updateValues =()=>{    
        console.log("in function statement");
        setSuccess(true);
        setUsername('');
        setPassword('');
    }

    useEffect(()=>{
        
       if(data == true) {
        setCookie('isLoggedIn',true);
        setCookie('Name',username, {      path: "/"    });
        updateValues();
    }
    if(manager == true){
        setCookie('isManager',true);
    }
    }, [data])

    const handleSubmit = (e) =>{
        e.preventDefault();
        const info = {username, password};
        console.log();
        console.log(info);
        
        // Send login info to the server. The response will be saved in the data variable. 
        fetch("https://6ca3-80-246-130-193.eu.ngrok.io/login", {
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
            setdata(data.Message);
            setManager(data.Message2);
            setIsPending(false);
            setError(null)
        })
        .catch(err => {
            setIsPending(false) 
            setError(err.message)
        })
    
    }
    return (  
        <> 
        <HomeNavbar/>
        {error && <div> { error } </div>}
        {/* {isPending && <div id='loadSign'><p> Loading...</p> </div>} */}
        
        <form onSubmit={handleSubmit}>
            <br/>
            <label >Username:</label>
            <br />
            <input  type= "text" 
                id='username' 
                required
                value={username}
                onChange= {(e) => setUsername(e.target.value)} />
            <br />
            <label >Password:</label>
            <br />
            <input  
                type= "password" 
                id='password' 
                required
                value={password}
                onChange= {(e) => setPassword(e.target.value)}/>
            <br/>
            <input type="submit" className='submit' value="Sign In"/>
        </form>
        <p id='correctionMessage'>{data.displayMessage}</p>
        <nav >
            <Link className = 'login' to="/RegisterPage">Don't have an account?  </Link> 
        </nav>
        {success?  
        <Navigate to="/Account "/> :
        <p id='correctionMessage'>{data.displayMessage}</p>
        }
        </>
     );
}
 
export default LoginPage;