import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [error, setError] = useState(null);
    const[isPending, setIsPending] = useState(true);
    const[data, setData]= useState('')

    useEffect(() =>{
      fetch(url,{
        method:'POST',
        // mode: 'no-cors' // 'cors' by default
      }).then(res =>{
            if (!res.ok) {
                throw Error("Data not found")
            }
            return res.json();
            })
        .then(data => {
                
                setData( data.Message);
                setIsPending(false);
                setError(null)
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message)
        })
     }, [url]);//
    return ( 
        {data, isPending, error}    

    );
}
 
export default useFetch;