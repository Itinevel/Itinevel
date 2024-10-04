// markerUtils.tsx
import mapboxgl from 'mapbox-gl';

// Function to update marker
export const updateMarker = (
  map: mapboxgl.Map | null,
  markers: mapboxgl.Marker[],
  index: number,
  coordinates: [number, number]
): mapboxgl.Marker[] => {
  if (map) {
    // Remove the existing marker if it exists
    if (markers[index]) {
      markers[index].remove();
    }

    // Create a custom HTML element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.textContent = (index + 1).toString(); // Number the marker
    el.style.backgroundColor = '#007cbf'; // Background color for the marker
    el.style.color = 'white'; // Text color
    el.style.width = '30px'; // Width of the marker
    el.style.height = '30px'; // Height of the marker
    el.style.display = 'flex'; // Display as flexbox
    el.style.justifyContent = 'center'; // Center the content horizontally
    el.style.alignItems = 'center'; // Center the content vertically
    el.style.borderRadius = '50%'; // Make it a circle

    // Create and add the new marker to the map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .addTo(map);

    // Update the markers array with the new marker
    return [
      ...markers.slice(0, index),
      marker,
      ...markers.slice(index + 1),
    ];
  }
  return markers;
};
