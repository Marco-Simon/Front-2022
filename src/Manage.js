import React from 'react';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import AccountNavbar from './AccountNavbar';
import useFetch from './useFetch';

/**
 * TODO: FIX BUGS FOR THE FUNCTION TO CHOOSE A FELLOW USER AS MANAGER
 * 
 */
const Manage = () => {
    // onSubmit={handleSubmitfile}
    const cookies = new Cookies();
    // const { data, isPending, Error } =useFetch('/getContact')
    
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    // let optionList = data.length > 0
    // && Object.values(data).map((item, i) => {
    //     return (
    //         <option key={i} value={item}>{item}</option>
    //         )
    //     }, this);
    const handleSubmit = (e) =>{
        e.preventDefault()
        // this is what will be sent to the server in json format.
        const formData = new FormData();
        formData.append('File', selectedFile);
       
       
        fetch("/scanningImg", {
            method:'POST',
            // headers: { "Content-Type" : "application/json"},
            body: formData
        }) .then((res) =>{
                        if (!res.ok) {
                           throw Error("Data not found")
                        }
                        return res.json();
                    })
        .then(data => {
            // setdata({
            //     displayMessage: data.Message
            // }); 
            
            // setIsPending(false);
            // setError(null);
        })
        .catch(err => {
            // setIsPending(false)
            // setError(err.message)
        })
    }
    return ( 
    <div>
        {(!(cookies.get('isLoggedIn')=='true') && !(cookies.get('isManager') =='true')) && <Navigate to="/"/> }
        <AccountNavbar/>
        <br/>
        <br/>
        <form onSubmit={handleSubmit} encType="multipart/form-data" accept=".jpg, .png, .jpeg, .gif">
            <input type="file" 
            id="myFile" 
            name="filename"
            onChange={(e)=>(setSelectedFile(e.target.files[0]), setIsFilePicked(true))}
            />
            <input type="submit" value="Click to Upload an Receipt"/>
        </form>
        {isFilePicked ? (
       <div>
       <table id='trTable'>
            <tr>
                <th>Filename:</th>
                <td>{selectedFile.name}</td>
            </tr>
            <tr>
                <th>Filetype:</th>
                <td>{selectedFile.type}</td>
            </tr>  
            <tr>
                <th>Size in bytes:</th>
                <td>{selectedFile.size}</td>
            </tr>  
        </table>
        </div>) : (<p>Select a file to show details</p>)}
        <br/>
        <br/>
        <br/>
        {/* <select 
            name= 'select'
            required 
            // onChange= {(e) => setClient(e.target.value)}
            >
            <option value="default" id = 'default'>Choose a Person:</option>
            {optionList}
        </select> */}
        {/* <button value='Remove'/> */}
    </div> );
}
 
export default Manage;