import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,intitialValue:T){
    const [storedValue,setStoredValue]= useState<T>(()=>{
        try {
            const item = window.localStorage.getItem(key)
            return item?JSON.parse(item):intitialValue;
        } catch (error) {
            console.error(error);
            return intitialValue;
        }
    });

    useEffect(()=>{
        try {
             window.localStorage.setItem(key,JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    },[key,storedValue])
    return [storedValue,setStoredValue] as const;
}