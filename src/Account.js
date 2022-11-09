import React from 'react';
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import AccountNavbar from './AccountNavbar';


// =============================================================================
/*TODO:  Use shmuels design. */
/*TODO: Add limits to date and time. */
/**
 *  TODO:finish with the useEffect that checks which machines are currently available.
 *  OPTIONAL: Add the possiblity to choose function( this will update the time needed for each reservation. 
 * And will change the amount of seconds in the server. )
 * 
 * TODO: put table of previuos reservations in a different components, then rerender once there is a change in 
 * the array. Create a variable to hold the table for dry and one for wash.
 */
// =============================================================================
const Account= () => {
    const today = new Date();
    // variables 
    const [time, setTime] = useState("");
    const [machine, setMachine] = useState("");
    const [date, setDate] = useState("")
    const [tab, setTab] = useState("wash")
    const [rsv, setRsv] = useState(true)
    const [tableWash, settableWash] = useState([])
    const [tableDry, settableDry] = useState([])

    // techinical variables 
    const[isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const[success, setSuccess]= useState(false)
    const [auth, setAuth] = useState(false)
    //arrays that hold the machines and the table.
    const [availMachines, setAvaillMachine] = useState([])
    const [allMachines, setAllMachines] = useState([])
    const [tableArray, settableArray] = useState([])
    
    // const [cookies, setCookie] = useCookies();
    const [data, setdata] = useState({
		displayMessage: ""});
    const cookies = new Cookies();

    function printMachines (array) {
        //this function converts an array of object to an array.
        const rtn = [];
            // console.log(array.length);
            for (let i = 0, j = 0; i < array.length; i++) { 
                if(array[i]['Type'] == tab){
                    // console.log('in if state');
                    rtn[j] = array[i]['Name'];
                    j++;  
                }         
            }
            return rtn ;
        }
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
        // dynamicly defines the select box. 
        // TIP: to dynamicly define html, use javascript as below. 'item' and 'i' are variables
        // used to loop through the array. 'i' is the index, 'item' is the values.
    let optionList = availMachines.length > 0
    && availMachines.map((item, i) => {
        return (
            <option key={i} value={item}>#{item}</option>
            )
        }, this);
        
    let trList = tableArray.length > 0
    && tableArray.map((item, i) => {
        return (
            // <option key={i} value={item}>#{item}</option>
            <tr id={i}>{Object.values(item).map((item1, j) => {
                return (
                    <td>{item1}</td>
                    )
                }, this)}<td><button id='cancel' value={i} onClick={()=>handleCancel(tableArray[i],i)}>Cancel
    </button></td></tr>
        )
    }, this);
    
    function handleCancel(value,i) {
        let timeC = value['time'];
        let dateC = value['date'];
        let machineC = value['machine'];
        let type = tab;
        let info = {timeC, dateC, machineC, type}
        fetch("https://4bf4-80-246-130-214.eu.ngrok.io/delete", {
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
            settableArray(updateArray(tableArray, i));
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false)
            setError(err.message)
        })

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

    //These useEffects are to synchronize the flow of the program.
    useEffect(()=>{
        console.log(tableArray);
        if(tab == 'wash') {settableWash(tableArray)} 
        if(tab == 'dry'){settableDry(tableArray)}
    }, [tableArray])
    useEffect(()=>{setAvaillMachine(printMachines(allMachines));}, [allMachines])
    useEffect(()=>{
        
        // Get all machines in the laundry room
        fetch("https://4bf4-80-246-130-214.eu.ngrok.io/getMachines",{
            method:'GET',
            mode: 'no-cors' // 'cors' by default
          }) .then((res) =>{
                        if (!res.ok) {
                           throw Error("Data not found")
                        }
                        return res.json();
                    })
        .then(data => {
            setAllMachines(data.Message);   
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false)
            setError(err.message)
        });
               
    },[]);
// ====================================================================================
    

    useEffect(() =>{
        console.log(' these are the machine for the current tab: ', availMachines);
        const type = tab;

        setTime(today.getHours() + ':' + today.getMinutes());
        setDate(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
        
        for (let i = 0; i < availMachines.length; i++) {
            const machineI = i;
            const info = {time, machineI, date, type}
            fetch("https://4bf4-80-246-130-214.eu.ngrok.io/isAvailable", {
                method:'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(info)
            }) .then((res) =>{
                if (!res.ok) {
                    throw Error("Data not found")
                }
                return res.json();
            })
            .then(data => {
                if( data.Message == true){
                    console.log(machineI);
                }
            })
            .catch(err => {
                setIsPending(false)
                setError(err.message)
            });
        }
        
       
 // this code will do something every minute.
        // const interval = setInterval(() => {
           
        //     console.log('does it work? ', availMachines);
            
        //   }, 120000);
        
        //   return () => clearInterval(interval);
        
        if(tab == 'dry') {settableArray(tableDry)}
        if(tab == 'wash'){settableArray(tableWash)}

    },[tab]);

    //this gets the table of reservations.        
    useEffect(()=> {
        const type = tab;
            fetch("https://4bf4-80-246-130-214.eu.ngrok.io/getTable", {
                method:'POST',
                mode: 'no-cors',
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({type})
            }) .then((res) =>{
                            if (!res.ok) {
                               throw Error("Data not found")
                            }
                            return res.json();
                        })
            .then(data => {
                settableArray(data.Message); 
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false)
                setError(err.message)
            })
    
        }, [rsv, tab])
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const type = tab;
        // this is what will be sent to the server in json format.
        var info = {time, machine, type, date };
        console.log(info);
       
        fetch("https://4bf4-80-246-130-214.eu.ngrok.io/index", {
            method:'POST',
            mode: 'no-cors',
            headers: { "Content-Type" : "application/json"},
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
            }); 
            
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false)
            setError(err.message)
        })
        if(rsv == true){setRsv(false)}; 
        if(rsv == false){setRsv(true)};
        
        
    }
    
    return(
        <div>
            {/* {!(cookies.get('isLoggedIn')=='true') && <Navigate to="/"/> } */}
            <AccountNavbar/>
            {Error && <div> { Error } </div>}
            {isPending && <div> Loading...</div>}
           <div id='leftPane' className='Panes'>
                    <div>
                        <button
                            id='tab1'
                            className='tabs' 
                            style={{backgroundColor: tab == 'wash' ? 'cyan' : '#48CAE4'}}
                            onClick={() => {
                                if( tab == 'dry'){setTab('wash');}
                            }} 
                        >Wash</button>
                       
                       </div>
                       <div>
                            <button id='tab2' 
                            className='tabs' 
                            style={{backgroundColor: tab == 'dry' ? 'cyan' : '#48CAE4'}}
                            onClick={() => {
                                if( tab == 'wash'){setTab('dry');}
                            }} 
                            >Dry</button>
                        </div>
                    </div>     
                   
            <div id='Pane'>       
            
                
                    
            <div id='RightPane' className='Panes'>        
                <br/>
                    <form onSubmit={handleSubmit}>
                        <p>Current Machines Available:</p>
                        {/* // this will appear only if the 'wash' tab is active  */}
                        {tab == 'wash' && <div className = "tabContent">
                        
                        <table>
                        <tr><th className='washTable'>Choose a machine:</th>
                            <th className='washTable'>Choose a Time:</th>
                            <th className='washTable'>Choose a Date:</th>
                            {/* <th className='washTable'>Choose a Function:</th> */}
                            <th className='washTable'></th></tr>
                        
                        <tr><td>
                            <select 
                                name= 'select'
                                required
                                onChange= {(e) => {setMachine(e.target.value)}}>
                                <option value="default" className='default' >Select Machine</option>
                                {optionList}
                            </select>
                            </td>
                            <td>
                            <input 
                            type="time" 
                            id="appt" 
                            name="appt"
                            required
                            value={time}
                            onChange= {(e) => setTime(e.target.value)}/>
                            </td>
                            <td>
                            <input 
                            type="date" 
                            id="birthday" 
                            name="birthday"
                            min={today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
                            required
                            value={date}
                            onChange= {(e) => setDate(e.target.value)}/>
                            </td>
                            <td></td>

                            <td>
                            <input type="submit" value="Reserve"/> 
                            </td></tr>
                        </table>
         
                        
                        
                        
                         
                        
                       
                        <br/>  
                        </div>
                        }

                        {/* ==== this will appear only if the 'dry' tab is active ==== */}
                        {tab == 'dry' && <div className='tabContent'>
                        <table>
                        <tr><th className='dryTable'>Choose a machine:</th>
                            <th className='dryTable'>Choose a Time:</th>
                            <th className='dryTable'>Choose a Date:</th>
                            <th className='dryTable'></th></tr>
                        
                        <tr><td>
                            <select 
                                name= 'select'
                                required 
                                onChange= {(e) => setMachine(e.target.value)}>
                                <option value="default" id = 'default'>Select Machine</option>
                                {/* <option value="0">#1</option>
                                <option value="1">#2</option> */}
                                {optionList}
                            </select>
                            </td>
                            <td>
                            <input 
                            type="time" 
                            id="appt" 
                            name="appt"
                            required
                            value={time}
                            onChange= {(e) => setTime(e.target.value)}/>
                            </td>
                            <td>
                            <input 
                            type="date" 
                            id="birthday" 
                            name="birthday"
                            min={today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
                            required
                            value={date}
                            onChange= {(e) => setDate(e.target.value)}/>
                            </td>

                            <td>
                            <input type="submit" value="Reserve"/> 
                            </td></tr>
                        </table>
                        </div>
                        }
                    </form>
                
               
               <table id='trTable'>
                        <tr>{tableList}</tr>
                        {trList}
                </table>
                </div>
            </div>
        </div>
    )
}
 
export default Account;