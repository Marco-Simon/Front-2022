import React from 'react';
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const Tables = (x) => {
    const [tableWash, settableWash] = useState([]);
    const [tableDry, settableDry] = useState([]);
    const [tab, setTab] = useState(x);
    const [rsv, setRsv] = useState(true);
    const[isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const[success, setSuccess]= useState(false);
    const [data, setdata] = useState([]);
    const cookies = new Cookies();
    const USERNAME = cookies.get('Name');
    const LASTNAME = cookies.get('LastName'); 

    function updateArray (array, index) {
        //this function filters an array.
        const rtn = [];
            // console.log(array.length);
        for (let i = 0, j = 0; i < array.length; i++) { 
            if(i != index){
                console.log('in if state');
                rtn[j] = array[i];
                j++;   
            }
                         
            }
        return rtn ;
    }
    var tableList =  
    <> <th className='dryTable'>Machine:</th>
    <th className='dryTable'>Time:</th>
    <th className='dryTable'>Date:</th>
    <th className='dryTable'>Cancel:</th></>;
    // if (tab == 'wash') {
    //     tableList = <><th className='washTable'>Machine:</th>
    //     <th className='washTable'>Time:</th>
    //     <th className='washTable'>Date:</th>
    //     <th className='washTable'>Function:</th>
    //     <th className='washTable'>Cancel:</th></>
    // }
    // else{
    //     tableList = 
    //     <> <th className='dryTable'>Machine:</th>
    //     <th className='dryTable'>Time:</th>
    //     <th className='dryTable'>Date:</th>
    //     <th className='dryTable'>Cancel:</th></>
    // }
    let trList = data.length > 0
        && data.map((item, i) => {
        return (
            // <option key={i} value={item}>#{item}</option>
            <tr id={i}>{Object.values(item).map((item1, j) => {
                return (
                    <td>{item1}</td>
                    )
                }, this)}<td><button id='cancel' value={i} onClick={()=>handleCancel(data[i],i)}>Cancel
                            </button></td></tr>
        )
    }, this);

    function handleCancel(value,i) {
        let timeC = value['time'];
        let dateC = value['date'];
        let machineC = value['machine'];
        let type = tab;
        let info = {timeC, dateC, machineC, type, USERNAME, LASTNAME}
        fetch("https://199a-5-28-186-8.eu.ngrok.io/delete", {
            method:'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(info)
        }) .then((res) =>{
                if (!res.ok) {
                    throw Error("Data not found")
                }
                    return res.json();
                })
        .then(DATA => { 
            setdata( updateArray(data, i));
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false)
            setError(err.message)
        })

    }
    useEffect(()=> {
    const type = tab;
    
        fetch("https://199a-5-28-186-8.eu.ngrok.io/getTable", {
            method:'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({type, USERNAME, LASTNAME})
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

    })
    useEffect(()=>{
        console.log(data);
        if(tab == 'wash') {settableWash(data)} 
        if(tab == 'dry'){settableDry(data)}}, [data])
    
    useEffect(()=>{
        if(tab == 'dry') {setdata(tableDry)}
        if(tab == 'wash'){setdata(tableWash)}
    }, [tab])
    
    return ( 
        <>
        {/* <button id='preRes' onClick={()=>{if(rsv == true){setRsv(false)}; if(rsv == false){setRsv(true)};}}>Previous Reservations</button> */}
        <table id='trTable'>
            <tr>{tableList}</tr>
            {trList}
        </table>
        </>
     );

}
 
export default Tables;