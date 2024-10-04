import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { initializeMap } from './initializeMap';
import { drawRoute } from './drawRoute';
import { updateMarker } from './markerUtils'; // Import the updateMarker function
import LocationInput from '../LocationInput'; // Import LocationInput

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

interface MapComponentProps {
  searchTexts: string[];
  selectedSuggestions: any[];
  transportModes: string[];
  setSuggestions: React.Dispatch<React.SetStateAction<any[][]>>;
  setSelectedSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const MapComponent = ({
  searchTexts,
  selectedSuggestions,
  transportModes,
  setSuggestions,
  setSelectedSuggestions
}: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const hoverPopup = useRef<mapboxgl.Popup>(new mapboxgl.Popup());

   // Initialize the map only once
   useEffect(() => {
    if (mapContainerRef.current) {
      const mapInstance = initializeMap(mapContainerRef.current);
      setMap(mapInstance);

      // Clean up map on unmount
      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  // Update markers whenever selectedSuggestions change
  useEffect(() => {
    if (map && selectedSuggestions.length > 0) {
      updateMarkers(map, selectedSuggestions);
    }
  }, [map, selectedSuggestions]);


  useEffect(() => {
    if (map && selectedSuggestions.length > 1) {
      drawRoute(map, selectedSuggestions, transportModes, hoverPopup.current);
    }
  }, [map, selectedSuggestions, transportModes]);

 const updateMarkers = (mapInstance: mapboxgl.Map, suggestions: any[]) => {
  const updatedMarkers = suggestions.map((suggestion, index) => {
    if (suggestion.geometry) {
      return updateMarker(mapInstance, markers, index, suggestion.geometry.coordinates);
    }
    return markers;
  }).flat();

  setMarkers(updatedMarkers);

  if (updatedMarkers.length > 0) {
    // Calculate the bounds to fit all markers
    const bounds = new mapboxgl.LngLatBounds();
    updatedMarkers.forEach(marker => {
      bounds.extend(marker.getLngLat());
    });

    // Fit the map to the bounds
    mapInstance.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      animate: false, // Disable the animation
    });
    // Set a custom zoom level after fitting the bounds
    const currentZoom = mapInstance.getZoom();
    const desiredZoom = currentZoom > 14 ? 14 : currentZoom; // Adjust this value as needed
    mapInstance.setZoom(desiredZoom); // Set a zoom level slightly less close
  }
};

  

  return (
    <div ref={mapContainerRef} className="h-full w-full">
      {/* Map container */}
    </div>
  );
};

export default MapComponent;
