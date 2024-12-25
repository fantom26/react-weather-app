import WeatherService, {
  CurrentWeatherQueryParams,
  WeatherApiResponse
} from "@/api/services/weather/service.ts";

export default class WeatherQueryMethods {
  public static readonly getCurrentWeather = async (
    query: CurrentWeatherQueryParams
  ): Promise<WeatherApiResponse> => {
    const response = await WeatherService.getCurrentWeather(query);

    return response;
  };
}
