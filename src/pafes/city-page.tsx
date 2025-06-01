import { userForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert,AlertDescription,AlertTitle, } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Currentweather } from "@/components/ui/currentweather";
import Hourlytempreture from "@/components/ui/hourlytempreture";
import Weatherdetails from "@/components/weatherdetails";
import WeatherForecast from "@/components/Weather-forecast";
import Favouritebutton from "@/components/ui/favouritebutton";

const citypage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat")||"0");
  const lon = parseFloat(searchParams.get("lon")||"0");

  const coordinates = {lat,lon};

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = userForecastQuery(coordinates);
  if(weatherQuery.error||forecastQuery.error){
    return(
      <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>Failed to load weather Data . please try Again</p>
          </AlertDescription>
      </Alert>
    )
  }
  if(!weatherQuery.data||!forecastQuery.data||!params.cityName){
    return <div className="w-full h-screen" />;
  }

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{params.cityName},{weatherQuery.data.sys.country}</h1>
          <div>
            <Favouritebutton data={{...weatherQuery.data,name:params.cityName}}/>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col  gap-4">
            <Currentweather data={weatherQuery.data} />
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

export default citypage;