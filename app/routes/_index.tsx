import type { MetaFunction } from "@remix-run/node";
import Card from "../components/Card";
import React, { useEffect, useRef } from "react";

const travelLocations = [
  { lat: 48.8566, lng: 2.3522 },   // Paris
  { lat: 35.6895, lng: 139.6917 }  // Tokyo
];
const livedLocations = [
  { lat: 30.0444, lng: 31.2357 },  // Cairo
  { lat: 51.5072, lng: -0.1276 }   // London
];

export const meta: MetaFunction = () => {
  return [
    { title: "The Lunatic Ltd." },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const mapRef = useRef<any>(null);
  useEffect(() => {
    const win = window as any;
    function initMap() {
      if (mapRef.current) {
        console.log("Map already initialized");
        return; // Already initialized
      }
      if (!win.L || !win.L.map) {
        console.log("Leaflet not loaded yet");
        return;
      }
      console.log("Initializing map");
      const mapInstance = win.L.map("map", {
        center: [10, 20],
        zoom: 2.5,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
        touchZoom: false,
        worldCopyJump: false,
        maxBoundsViscosity: 1.0,
        // noWrap: false, // allow horizontal repeat for full width
      });
      // Remove raster tile layers, use a white background
      mapInstance.getContainer().style.background = '#fff';

      // User's visited and lived-in countries/states
      const visitedCountries = [
        "Democratic Republic of the Congo", "Egypt", "Uganda", "Tanzania", "United Arab Emirates", "Azerbaijan", "Germany", "France", "Ireland", "United Kingdom", "Norway", "Vietnam", "China", "Japan", "Malaysia", "Singapore", "Brazil", "Ecuador", "Colombia", "Canada", "British Virgin Islands", "United States"
      ];
      const visitedStates = [
        "Tennessee", "Arkansas", "Alaska", "Ohio", "Indiana", "Mississippi", "Alabama", "Georgia", "Florida", "Rhode Island", "Virginia", "West Virginia", "Pennsylvania", "New Jersey", "New York", "Louisiana", "Kansas", "Nebraska", "South Dakota", "Colorado", "Montana", "Nevada", "Utah", "Arizona", "New Mexico", "Missouri", "Wisconsin", "Delaware", "Illinois", "Michigan", "North Carolina", "South Carolina", "Wyoming", "Washington, D.C."
      ];
      const livedCountries = ["Kenya", "United States", "United States Virgin Islands", "US Virgin Islands"];
      const livedStates = ["Kentucky", "Maryland", "Texas", "Oklahoma"];

      // Helper for country name normalization
      function normalizeCountryName(name: any) {
        if (name === "Zaire") return "Democratic Republic of the Congo";
        if (name === "England" || name === "Scotland" || name === "Northern Ireland") return "United Kingdom";
        if (name === "Dubai" || name === "Sharjah") return "United Arab Emirates";
        return name;
      }

      // Load and style countries
      fetch("/assets/ne_50m_admin_0_countries.geojson")
        .then(res => res.json())
        .then(data => {
          win.L.geoJSON(data, {
            style: (feature: any) => {
              const name = normalizeCountryName(feature.properties.ADMIN || feature.properties.name);
              if (livedCountries.includes(name)) {
                return { color: "#22c55e", weight: 2, fillColor: "#22c55e", fillOpacity: 0.25 };
              }
              if (visitedCountries.includes(name)) {
                return { color: "#2563eb", weight: 2, fillColor: "#2563eb", fillOpacity: 0.18 };
              }
              return { color: "#222", weight: 1, fillColor: "#fff", fillOpacity: 0 };
            },
            interactive: false,
          }).addTo(mapInstance);
        });
      // Load and style US states (new file)
      fetch("/assets/us_states.geojson")
        .then(res => res.json())
        .then(data => {
          win.L.geoJSON(data, {
            style: (feature: any) => {
              const name = feature.properties.name;
              if (livedStates.includes(name)) {
                return { color: "#22c55e", weight: 2, fillColor: "#22c55e", fillOpacity: 0.25 };
              }
              if (visitedStates.includes(name)) {
                return { color: "#2563eb", weight: 2, fillColor: "#2563eb", fillOpacity: 0.18 };
              }
              return { color: "#222", weight: 1, fillColor: "#fff", fillOpacity: 0 };
            },
            interactive: false,
          }).addTo(mapInstance);
        });
      mapRef.current = mapInstance;
      // Adjust map center for more map below card
      mapInstance.setView([20, 10], 2.5);
    }
    function waitForLeafletAndInit(retries = 10) {
      if (typeof window === "undefined") return;
      const win = window as any;
      if (win.L && win.L.map) {
        initMap();
      } else if (retries > 0) {
        console.log("Waiting for Leaflet to load...");
        setTimeout(() => waitForLeafletAndInit(retries - 1), 300);
      } else {
        console.error("Leaflet JS did not load after waiting.");
      }
    }
    if (typeof window !== "undefined") {
      if (!win.L) {
        if (!document.getElementById('leaflet-cdn')) {
          const script = document.createElement('script');
          script.id = 'leaflet-cdn';
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.async = true;
          script.onload = () => {
            console.log("Leaflet script loaded");
            waitForLeafletAndInit();
          };
          document.body.appendChild(script);
        } else {
          document.getElementById('leaflet-cdn')!.addEventListener('load', () => {
            console.log("Leaflet script loaded (event)");
            waitForLeafletAndInit();
          });
        }
        waitForLeafletAndInit();
      } else {
        waitForLeafletAndInit();
      }
    }
    return () => {
      if (mapRef.current && mapRef.current.remove) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Leaflet marker styles in head */}
      <style>{`
        #map {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          min-width: 100vw;
          max-width: 100vw;
          height: 100vh;
          z-index: 0;
          opacity: 0.1;
        }
        /* Subtle paper/grain texture overlay */
        .retro-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          background: repeating-linear-gradient(135deg, rgba(140,120,90,0.04) 0px, rgba(140,120,90,0.04) 1px, transparent 1px, transparent 8px), url('https://www.transparenttextures.com/patterns/paper-fibers.png');
          background-color: #f5ecd7;
          background-blend-mode: multiply;
        }
        /* Map marker and highlight retro colors */
        .leaflet-overlay-pane .marker-travel {
          stroke: #b48a78 !important;
          fill: #b48a78 !important;
          fill-opacity: 0.18 !important;
        }
        .leaflet-overlay-pane .marker-lived {
          stroke: #a89c6d !important;
          fill: #a89c6d !important;
          fill-opacity: 0.22 !important;
        }
        .marker-travel {
          background: #b48a78;
          border: 2px solid #fff;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 4px #b48a7844;
        }
        .marker-lived {
          background: #a89c6d;
          border: 2px solid #fff;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 6px #a89c6d44;
        }
        .leaflet-control, .leaflet-attribution-flag, .leaflet-bottom, .leaflet-top {
          display: none !important;
        }
      `}</style>
      {/* Paper/grain texture overlay */}
      <div className="retro-bg" />
      <div id="map" style={{zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh'}} />
      <div className="relative z-10 min-h-screen h-screen flex flex-col justify-center items-center overflow-hidden" style={{background: 'transparent'}}>
        <main className="relative z-10 flex flex-1 flex-col justify-center items-center w-full px-4">
          <Card />
        </main>
        <footer className="w-full absolute top-6 left-0 flex justify-center z-20">
          <span className="text-xs md:text-sm tracking-widest bg-[#f5ecd7]/80 text-[#666666] px-4 py-1 rounded-full shadow-sm select-none border border-[#e2d3b1]">
            Get Lost • Survive • Thrive
          </span>
        </footer>
      </div>
    </>
  );
}

const resources = [
  {
    href: "https://remix.run/start/quickstart",
    text: "Quick Start (5 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/start/tutorial",
    text: "Tutorial (30 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/docs",
    text: "Remix Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
