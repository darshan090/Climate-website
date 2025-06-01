import type { Coordinates } from "@/API/types";
import { useEffect, useState } from "react";

interface GeolocationState{
    coordinates:Coordinates | null;
    error:string | null;
    isLoading:boolean;
}


export function UseGeolocation(){
    const[locationData,setlocationData] = useState<GeolocationState>({
        coordinates:null,
        error:null,
        isLoading:true,
    });
    const getLocatioin=()=>{
        setlocationData((prev)=>({...prev,isLoading:true,error:null}));

        if(!navigator.geolocation){
            setlocationData({
                coordinates:null,
                error:"Geolocation is not supported by User",
                isLoading:false,
            })
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setlocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                },
                error:null,
                isLoading:false,
            })
        },(error)=>{
            let errorMessage:string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage="location permission denied";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage="U enterd wrong location";
                    break;
                case error.TIMEOUT:
                    errorMessage="Location request timeout";
                    break;
                default:
                    errorMessage="An unknown error occured";
            }
            setlocationData({
                coordinates:null,
                error:errorMessage,
                isLoading:false,
            });
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0,
        });
    }
    useEffect(()=>{
        getLocatioin();
    },[])

    return {
        ...locationData,
        getLocatioin,
    };
}