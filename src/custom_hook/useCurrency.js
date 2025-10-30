import { useEffect, useState } from "react";


function useCurrency(from, to, amount){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        if(!from || !to || amount==="" || amount === 0 || isNaN(amount)){
            setData(null);
            setLoading(false)
        } 
        
        setLoading(true);
        setError(null)
        
        
        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        .then((res) => res.json())
        .then((res) => {
            setData(res.rates[to]);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error Fetching Currency!",err)
            setError("Failed to fetch conversion rate");
            setLoading(false)
        })

    },[from ,to ,amount]);

    return {data, loading, error};

}

export default useCurrency