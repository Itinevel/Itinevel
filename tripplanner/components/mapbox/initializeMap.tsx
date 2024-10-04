// mapinit.tsx
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS

// Set the Mapbox access token using the environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

// Initial start location coordinates (Portland, OR)
const start: [number, number] = [-122.662323, 45.523751];

// Function to initialize the map
export const initializeMap = (mapContainer: HTMLDivElement) => {
  const mapInstance = new mapboxgl.Map({
    container: mapContainer, // Reference to the map container
    style: 'mapbox://styles/mapbox/streets-v12', // Mapbox style
    center: start, // Initial center of the map
    zoom: 12, // Initial zoom level
  });

  // Add controls to the map
  mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right'); // Navigation control (zoom and rotation)
  mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-left'); // Fullscreen control
  mapInstance.addControl(new mapboxgl.ScaleControl(), 'bottom-left'); // Scale control

  return mapInstance;
};
