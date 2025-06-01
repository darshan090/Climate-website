import { Button } from "@/components/ui/button";
import { UseGeolocation } from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import MakeSkeleton from "@/components/ui/loading-skeleton";
import  {Alert}  from "@/components/ui/alert";
import { AlertTitle } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";
import { useReverseGeocodeQuery, userForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";
import {Currentweather} from "@/components/ui/currentweather";
import Hourlytempreture from "@/components/ui/hourlytempreture";
import Weatherdetails from "@/components/weatherdetails";
import WeatherForecast from "@/components/Weather-forecast";
import Favouritecities from "@/components/favouritecities";


const weatherdashboard = () => {

  const{getLocatioin,isLoading:locationLoading,error:locationError,coordinates} = UseGeolocation();


  console.log("Coordinates:", coordinates) 
  const forecastQuery = userForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  console.log(weatherQuery.data)

  const handleRefresh=()=>{
    getLocatioin();
      if(coordinates){
        forecastQuery.refetch();
        weatherQuery.refetch();
        locationQuery.refetch();
      }
  };
  if(locationLoading){
    return <MakeSkeleton />
  }

  if(locationError){
    return(
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Failed to fetch weather data plaesetry again</p>
              <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
                <RefreshCcw className="mr-2 h-4 w-4"/>
                retry
              </Button>
            </AlertDescription>
        </Alert>
    )
  }

  if(!coordinates){
    return(
          <Alert variant="destructive">
            <AlertTitle>Location required</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Please enable location access to get you through</p>
              <Button onClick={getLocatioin} variant={"outline"} className="w-fit">
                <MapPin className="mr-2 h-4 w-4"/>
                Enable location
              </Button>
            </AlertDescription>
        </Alert>
    )
  }

  const locationName = locationQuery.data?.[0];

  if(weatherQuery.error||forecastQuery.error){
    return(
      <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button onClick={getLocatioin} variant={"outline"} className="w-fit">
              <MapPin className="mr-2 h-4 w-4"/>
              Enable location
            </Button>
          </AlertDescription>
      </Alert>
    )
  }

  if(!weatherQuery.data||!forecastQuery.data){
    return<Skeleton />;
  }

  return (
    <div className="space-y-4">
      <Favouritecities />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My location</h1>
          <Button variant={"outline"} size={"icon"} 
            onClick={handleRefresh} 
            disabled={weatherQuery.isRefetching||forecastQuery.isFetching}
            >
            <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}></RefreshCcw>
          </Button>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Currentweather data={weatherQuery.data} locationName={locationName}/>
            <Hourlytempreture data = {forecastQuery.data}/>
          </div>
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <Weatherdetails data={weatherQuery.data}/>
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
    </div>
  )
}

export default weatherdashboard;