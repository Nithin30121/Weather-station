import { useState, useRef, useEffect } from "react";
import { getCurrentWeather, searchLocations } from "./api/openMeteo";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [query, setQuery] = useState("Chennai");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay blocked:", error);
      });
    }
  }, []);

  async function onSearch() {
    setError("");
    setStatus("");
    setWeather(null);
    setSelected(null);

    const q = query.trim();
    if (!q) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Searching locations...");
      const results = await searchLocations(q);
      setLocations(results);

      if (results.length === 0) {
        setStatus("");
        setError("No matching locations found.");
      } else {
        setStatus("Select a location below.");
      }
    } catch {
      setError("Failed to search locations. Check internet and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onPickLocation(loc) {
    setError("");
    setStatus("");
    setSelected(loc);
    setWeather(null);

    try {
      setLoading(true);
      setStatus("Fetching current weather...");
      const data = await getCurrentWeather(loc.latitude, loc.longitude);
      setWeather(data);
      setStatus("Done with your command MASTER");
    } catch {
      setError("Failed to fetch weather for this location.");
    } finally {
      setLoading(false);
    }
  }

  const placeLabel = selected
    ? `${selected.name}${selected.admin1 ? ", " + selected.admin1 : ""}, ${selected.country}`
    : "";

  return (
    <div className="relative min-h-screen">
      {/* ✅ Background Video - Looping */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0 scale-125"
      >
        {/* ✅ Put background.mp4 in /public */}
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ✅ Background Audio - Plays Once */}
      <audio
        autoPlay
        className="fixed inset-0"
      >
        <source src="/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="mx-auto max-w-2xl p-6">
         <header className="rounded-2xl bg-black/60 backdrop-blur-sm


 p-6 shadow-2xl border border-white/10">

<h1 className="font-['Orbitron'] tracking-widest text-cyan-300 font-semibold text-3xl md:text-4xl leading-tight">
  GALACTICA WEATHER STATION
</h1>



           <p className="mt-2 text-slate-300">
              Type a city → choose location → view current weather 
            </p>

            <div className="mt-5 flex gap-2">
              <input
               className="flex-1 rounded-xl border border-white/20 bg-black/40 text-white placeholder:text-slate-400 px-4 py-2 outline-none focus:ring-2 focus:ring-white/40" 
                placeholder="Example: Vijayawada"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />

              <button
                onClick={onSearch}
                className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800 transition"
                disabled={loading}
              >
                {loading ? "..." : "Search"}
              </button>
            </div>

            {(status || error) && (
              <div className="mt-3 text-sm">
{status === "Done with your command MASTER" ? (
  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 shadow-[0_0_12px_rgba(16,185,129,0.35)]">
    <span className="text-emerald-300 font-semibold">Done with your command </span>
    <span className="text-red-400 font-semibold">MASTER</span>
    <span className="text-emerald-400"></span>
  </div>
) : (
  status && <p className="text-slate-300">{status}</p>
)}
                {error && <p className="text-red-600 font-semibold">{error}</p>}
              </div>
            )}
          </header>

          {locations.length > 0 && (
<div className="mt-5 rounded-2xl bg-black/50 backdrop-blur-md p-5 shadow-2xl border border-white/10">
            <p className="font-semibold text-white">Select a location</p>

              <div className="mt-3 grid gap-2">
                {locations.map((loc) => (
                 <button
  key={loc.id}
  onClick={() => onPickLocation(loc)}
  className={`text-left rounded-xl border border-white/10 bg-black/40 p-3 
    cursor-pointer hover:translate-y-[-1px] transition-all duration-150 active:scale-[0.99]
    ${selected?.id === loc.id
      ? "ring-2 ring-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
      : "hover:bg-white/5 hover:shadow-lg"}
  `}
  disabled={loading}
>

                    <p className="font-semibold text-white">
                      {loc.name}
                      {loc.admin1 ? `, ${loc.admin1}` : ""} — {loc.country}
                    </p>
                   <p className="text-xs text-slate-300">
                      Lat: {loc.latitude}, Lon: {loc.longitude}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {weather && <WeatherCard placeLabel={placeLabel} weather={weather} />}
        </div>
      </div>
    </div>
  );
}
