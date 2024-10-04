// drawRoute.tsx
import mapboxgl from 'mapbox-gl';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

export const drawRoute = async (
  map: mapboxgl.Map,
  selectedSuggestions: any[],
  transportModes: string[],
  hoverPopup: mapboxgl.Popup // Update the type here
) => {
  if (map && selectedSuggestions.length > 1) {
    // Remove existing layers and sources if they exist
    if (map.getLayer('route')) {
      map.removeLayer('route');
      console.log('Removed route layer');
    }
    if (map.getLayer('highlightedRoute')) {
      map.removeLayer('highlightedRoute');
      console.log('Removed highlightedRoute layer');
    }
    if (map.getSource('route')) {
      map.removeSource('route');
      console.log('Removed route source');
    }

    // Remove existing hoverPopup if it exists
    if (hoverPopup) {
      hoverPopup.remove();
      console.log('Removed hoverPopup');
    }

    const validSuggestions = selectedSuggestions.filter(s => s && s.geometry);
    if (validSuggestions.length > 1) {
      let overallDistance = 0;
      let overallDuration = 0;
      const features: Feature<Geometry, GeoJsonProperties>[] = [];

      for (let i = 0; i < validSuggestions.length - 1; i++) {
        const start = (validSuggestions[i].geometry as GeoJSON.Point).coordinates;
        const end = (validSuggestions[i + 1].geometry as GeoJSON.Point).coordinates;
        const mode = transportModes[i] || 'driving';

        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/${mode}/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}&steps=true`
        );
        const data = await response.json();
        const route = data.routes[0].geometry;

        features.push({
          type: 'Feature',
          geometry: route,
          properties: { description: `Segment ${i + 1}`, id: `segment-${i}` },
        });

        overallDistance += data.routes[0].distance;
        overallDuration += data.routes[0].duration;

        // Add Google Maps URL for each segment
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${mode}`;
        
        features.push({
          type: 'Feature',
          geometry: route,
          properties: { description: `Segment ${i + 1}`, id: `segment-${i}`, googleMapsUrl },
        });
      }

      // Add the new source and layers
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features,
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#ff5500',
          'line-width': 5,
        },
      });

      map.addLayer({
        id: 'highlightedRoute',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#00FFFF',
          'line-width': 7,
          'line-opacity': 0.5,
          'line-blur': 2,
        },
        // Remove the filter since hoveredRoute is not defined
        filter: ['==', 'id', ''], 
      });

      const distance = overallDistance / 1000;
      const duration = overallDuration / 60;

      // Initialize a new popup object
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // Ensure old listeners are removed
      map.off('mouseenter', 'route', () => {});
      map.off('click', () => {});

      // Add event listeners for hover and click
      map.on('mouseenter', 'route', (e) => {
        console.log('Mouse entered route layer');
        map.getCanvas().style.cursor = 'pointer';

        if (e.features && e.features.length > 0) {
          const coordinates = e.lngLat;
          const description = e.features[0]?.properties?.description;
          const googleMapsUrl = e.features[0]?.properties?.googleMapsUrl;

          // Remove any existing popup content before adding new one
          if (popup.isOpen()) {
            popup.remove();
          }

          popup
            .setLngLat(coordinates)
            .setHTML(`
              <div style="position: relative; padding: 10px; color: black;">
                <button style="position: absolute; top: 5px; right: 5px; border: none; background: none; font-size: 16px; cursor: pointer;" onclick="this.closest('.mapboxgl-popup').remove();">×</button>
                <p>${description || ''}</p>
                <a href="${googleMapsUrl}" target="_blank" style="color: blue; text-decoration: underline;">View Segment Details</a>
              </div>
            `)
            .addTo(map);
        }
      });

      map.on('click', () => {
        console.log('Map clicked');
        if (popup.isOpen()) {
          popup.remove();
          console.log('Popup removed on map click.');
        }
      });
    }
  }
};
