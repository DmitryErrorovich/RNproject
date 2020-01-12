export interface ICity {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

export enum WeatherStateAbbr {
  sn = 'sn',
  sl = 'sl',
  h = 'h',
  t = 't',
  hr = 'hr',
  lr = 'lr',
  s = 's',
  hc = 'hc',
  lc = 'lc',
  c = 'c'
}

export interface IWeather {
  air_pressure: number;
  applicable_date: Date;
  created: string;
  humidity: number;
  id: number;
  max_temp: number;
  min_temp: number;
  predictability: number;
  the_temp: number;
  visibility: number;
  weather_state_abbr: WeatherStateAbbr;
  weather_state_name: string;
  wind_direction: number;
  wind_direction_compass: string;
  wind_speed: number;
}
