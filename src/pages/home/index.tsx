import WeatherQueryMethods from "@/api/services/weather/query.ts";
import { useQuery } from "react-query";

function Home() {
  const query = useQuery({
    queryKey: "currentWeather",
    queryFn: () => WeatherQueryMethods.getCurrentWeather({ q: "Valencia" })
  });

  console.log(query);

  return <h1>Home Page</h1>;
}

export default Home;
