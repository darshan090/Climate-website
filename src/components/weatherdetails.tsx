import type { Weatherdata } from "@/API/types"
import {Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import {format} from "date-fns";
import { Card, CardHeader,CardTitle,CardContent } from "./ui/card";


interface weatherdetailsProps{
    data:Weatherdata
}

const Weatherdetails = ({data}:weatherdetailsProps) => {
  const{wind,main,sys}=data;

  const getWindDirection =(degree:number)=>{
    const direction = ["N","NE","E","SE","S","SW","W","NW"];
    const index = Math.round(((degree%=360)<0?degree+360:degree)/45)%8;
    return direction[index];
  }

  const formatTime = (timeStamp:number) => {
    return format(new Date(timeStamp*1000),"hh:mm a")
  }

  const details = [
    {
        title:"Sunrise",
        value:formatTime(sys.sunrise),
        icon:Sunrise,
        color:"text-orange-500"
    },
    {
        title:"Sunset",
        value:formatTime(sys.sunset),
        icon:Sunset,
        color:"text-blue-500"
    },
    {
        title:"Wind Direction",
        value:`${getWindDirection(wind.deg)} (${wind.deg}°)`,
        icon:Compass,
        color:"text-green-500",
    },
    {
        title:"Pressure",
        value:`${main.pressure}hPA`,
        icon:Gauge,
        color:"text-purple-500",
    }
  ];

  return (
    <Card>
        <CardHeader>
            <CardTitle>Weather details</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
                {details.map((detail)=>{
                    return <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                        <detail.icon className={`h-5 w-5 ${detail.color}`}/>
                        <div>
                            <p className="text-sm font-medium list-none">{detail.title}</p>
                            <p className="text-sm to-muted-foreground">{detail.value}</p>
                        </div>
                    </div>
                })}
            </div>
        </CardContent>
</Card>

  )
}

export default Weatherdetails;