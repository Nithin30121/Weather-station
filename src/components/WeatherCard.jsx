// src/components/WeatherCard.jsx
import { weatherCodeToText } from "../api/openMeteo";

// Map Open-Meteo weather codes -> Weather Icons class names
function iconClassFromWeatherCode(code, isDay) {
  // Day/Night variants (optional but nice)
  const day = isDay ? "day" : "night";

  if (code === 0) return `wi-${day}-sunny`;
  if (code === 1) return `wi-${day}-sunny-overcast`; // mostly clear
  if (code === 2) return `wi-${day}-cloudy`;         // partly cloudy
  if (code === 3) return "wi-cloudy";                // overcast

  if (code === 45 || code === 48) return "wi-fog";

  // Drizzle
  if (code === 51 || code === 53 || code === 55) return "wi-sprinkle";
  if (code === 56 || code === 57) return "wi-sleet";

  // Rain
  if (code === 61 || code === 63 || code === 65) return "wi-rain";
  if (code === 66 || code === 67) return "wi-rain-mix";

  // Snow
  if (code === 71 || code === 73 || code === 75) return "wi-snow";
  if (code === 77) return "wi-snowflake-cold";

  // Showers
  if (code === 80 || code === 81 || code === 82) return "wi-showers";

  // Thunderstorm
  if (code === 95 || code === 96 || code === 99) return "wi-thunderstorm";

  return "wi-na";
}

export default function WeatherCard({ placeLabel, weather }) {
  const cur = weather?.current;
  if (!cur) return null;

  const isDay = cur.is_day === 1;
  const conditionText = weatherCodeToText(cur.weather_code);

  const iconClass = iconClassFromWeatherCode(cur.weather_code, isDay);

  return (
    <div className="mt-5 rounded-2xl bg-black/50 backdrop-blur-md p-5 shadow-2xl border border-white/10 text-white">
      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-lg font-bold text-white truncate">{placeLabel}</p>

          <p className="mt-1 text-sm text-slate-300">
            {conditionText} • {isDay ? "Day" : "Night"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Timezone: {weather.timezone}
          </p>
        </div>

        {/* Icon + Temp */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-3">
            <i className={`wi ${iconClass} text-5xl`} aria-hidden="true"></i>

            <p className="text-4xl font-extrabold text-white">
              {Math.round(cur.temperature_2m)}°C
            </p>
          </div>

          <p className="mt-1 text-sm text-slate-300">
            Feels like {Math.round(cur.apparent_temperature)}°C
          </p>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
          <p className="text-slate-300">Humidity</p>
          <p className="font-semibold text-white">
            {cur.relative_humidity_2m}%
          </p>
        </div>

        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
          <p className="text-slate-300">Wind</p>
          <p className="font-semibold text-white">
            {cur.wind_speed_10m} km/h
          </p>
        </div>
      </div>
    </div>
  );
}
