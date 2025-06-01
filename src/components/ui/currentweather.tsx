import type { GeocodingResponse, Weatherdata } from "@/API/types"
import { Card } from "./card"
import { CardContent } from "./card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";


interface CurrentWeatherProps{
    data:Weatherdata;
    locationName?:GeocodingResponse;
};

export function Currentweather({ data, locationName }: CurrentWeatherProps) {
    console.log("Currentweather received data:", data); // Check if data looks correct
    console.log("Currentweather received locationName:", locationName); // Check if locationName looks correct

    // Add a try-catch block for safety during destructuring
    
        const {
            weather: [currentweather],
            main: { temp, feels_like, temp_min, temp_max, humidity },
            wind: { speed },
        } = data;

        const formattemp =(temp:number)=>`${Math.round(temp)}°` // Check if destructuring worked

        // --- NOW ADD THE JSX TO RENDER THIS DATA ---
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-end gap-1"> {/* Added gap */}
                                    <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name ?? "Loading location..."}</h2> {/* Added fallback text */}
                                    {locationName?.state && (
                                        <span className="text-muted-foreground">
                                            , {locationName.state} {/* Changed dot to comma */}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {locationName?.country}
                                </p>
                           </div>
                           <div className="flex items-center gap-2">
                                    <p className="text-7xl font-bold tracking-tighter">{formattemp(temp)}</p>
                                    <div className="space-y-1 ">
                                        <p className="text-sm font-medium text-muted-foreground">Feels like{formattemp(feels_like)}</p>
                                    <div className="flex gap-2 text-sm font-medium">
                                        <span className="flex items-center gap-1 text-blue-500">
                                            <ArrowDown className="h-3 w-3" />
                                            {formattemp(temp_min)}
                                        </span>
                                        <span className="flex items-center gap-1 text-red-500">
                                            <ArrowUp className="h-3 w-3" />
                                            {formattemp(temp_max)}
                                        </span>
                                    </div>
                                 </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Humidity</p>
                                        <p className="text-sm text-muted-foreground">{humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wind className="h-4 w-4 text-blue-400" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Wind speed</p>
                                        <p className="text-sm text-muted-foreground">{speed}m/s</p>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                                <img src={`https://openweathermap.org/img/wn/${currentweather}@4x.png`}  alt={currentweather.description} className="h-full w-full object-contain"/>
                                <div className="absolute bottom-0 text-center">
                                    <p className="text-sm font-medium capitalize">
                                        {currentweather.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
}
