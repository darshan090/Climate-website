export interface Coordinates {
    lat:number;
    lon:number;
}

export interface WeatherCondition{
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface Weatherdata{
    coord:Coordinates;
    weather:WeatherCondition[];
    main:{
        temp:number;
        feels_like:number;
        temp_min:number;
        temp_max:number;
        humidity: number;
        pressure:number;
    };
    wind:{
        speed:number;
        deg:number;
    };
    sys:{
        sunrise:number;
        sunset:number;
        country:string;
    };
    name:string;
    dt:number;
}
export interface Forecastdata{
    list:Array<{
        dt:number;
        main:Weatherdata["main"];
        weather:Weatherdata["weather"];
        wind:Weatherdata["wind"];
        dt_txt:string;
    }>;
    city:{
        name:string;
        country:string;
        sunrise:number;
        sunset:number;
    };
}

export interface GeocodingResponse{
    name:string;
    local_name?:Record<string,string>;
    lat:number;
    lon:number;
    country:string;
    state?:string;
}