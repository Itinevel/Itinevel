// mapboxUtils.ts
export const geocodeLocation = async (query: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
    );
    const data = await response.json();
    return data;
  };
  
  export const autocompleteLocation = async (query: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
    );
    const data = await response.json();
    return data;
  };
  