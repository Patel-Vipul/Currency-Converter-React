import { useEffect, useState } from "react";


function useDebounce(value, delay=500){
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        //set a timeout to update the debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        },delay)

        //cleanup:- cancel the timeout if value changes before delay
        return () => {
            clearTimeout(handler)
        }
    }),[value,delay]

    return debouncedValue
}

export default useDebounce