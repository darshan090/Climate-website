import { useState } from "react"
import { Button } from "./ui/button"
import { CommandDialog,CommandInput,CommandList,CommandEmpty,CommandGroup,CommandItem, CommandSeparator } from "./ui/command"
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
import { useFavourites } from "@/hooks/use-favourite";


const CitySearch = () => {

  const [open,setOpen] = useState(false);
  const[query,setQuery]=useState(" ");
  const {data:locations,isLoading} = useLocationSearch(query)
  const navigate = useNavigate()
  const {history,clearHistory,addToHistory} = useSearchHistory()
  const {Favourites, removeFavourite} = useFavourites();

  const handleselect = (cityData:string)=>{
    const [lat,lon,name,country ]= cityData.split("|");
    addToHistory.mutate({
        query,
        name,
        lat:parseFloat(lat),
        lon:parseFloat(lon),
        country,
    })
    setOpen(false)
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
  }
  return (
    <>
        <Button variant="outline" className="relative w-full text-sm to-muted-foreground sm:pr-12 md:w-40 lg:w-64" onClick={()=>{setOpen(true)}}>
           <Search className="mr-2 h-4 w-4"/> 
           Search cities...
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Search cities"
                value={query}
                onValueChange={setQuery}
            />
                <CommandList>
                   {query.length>2 && !isLoading &&(<CommandEmpty>No cities found.</CommandEmpty>)}
                   {Favourites.length>0 && (
                            
                                <CommandGroup>
                                    <div className="flex items-center justify-between px-2 my-2">
                                        <p className="text-xs text-muted-foreground">Favourite Cities</p>
                                    </div>
                                    {Favourites.map((location)=>{
                                        return (
                                            <CommandItem key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleselect}
                                            >
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <Clock className="mr-2 h-4 w-4 to-muted-foreground"/>
                                                    <span>{location.name}</span> 
                                                    {location.state && (
                                                        <span className="text-sm text-muted-foreground">
                                                            ,{location.state}
                                                        </span>
                                                    )}
                                                    <span className="text-sm text-muted-foreground">
                                                        ,{location.country}
                                                    </span>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFavourite.mutate(`${location.lat}-${location.lon}`);
                                                    }}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CommandItem>
                                        )
                                    })} 
                                </CommandGroup>
                            
                            )}
                        {history.length>0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <div className="flex items-center justify-between px-2 my-2">
                                        <p className="text-xs text-muted-foreground">Recent-searches</p>
                                        <Button variant="ghost" size="sm" onClick={()=>clearHistory.mutate()}>
                                            <XCircle className="h-4 w-4" />
                                            clear
                                        </Button>
                                    </div>
                                    {history.map((location)=>{
                                        return (
                                            <CommandItem key={`${location.lat}-${location.lon}`}
                                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                            onSelect={handleselect}
                                            >
                                            <Clock className="mr-2 h-4 w-4 to-muted-foreground"/>
                                            <span>{location.name}</span> 
                                            {location.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    ,{location.state}
                                                </span>
                                            )}
                                                <span className="text-sm text-muted-foreground">
                                                    ,{location.country}
                                                </span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    {format(location.searchedAt,"MMM d,h:mm a")}
                                                </span>
                                        </CommandItem>
                                        )
                                    })} 
                                </CommandGroup>
                            </>
                            )}
                            
                         <CommandSeparator />
                            

                        {locations && locations.length >0 && (
                            <CommandGroup heading="Suggestions">
                                {isLoading && (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                )}
                                {locations.map((location)=>{
                                    return <CommandItem key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleselect}
                                    >
                                    <Search className="mr-2 h-4 w-4"/>
                                    <span>{location.name}</span> 
                                    {location.state && (
                                        <span className="text-sm text-muted-foreground">
                                            ,{location.state}
                                        </span>
                                    )}
                                    {location.country && (
                                        <span className="text-sm text-muted-foreground">
                                            ,{location.country}
                                        </span>
                                    )}
                                </CommandItem>
                                })}
                            </CommandGroup>
                        )}
                    </CommandList>
        </CommandDialog>
    </>
  )
}

export default CitySearch