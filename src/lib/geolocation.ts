const GEOLOCATION_CACHE_KEY = 'woo_geolocation';
const GEOLOCATION_CACHE_TTL = 24 * 60 * 60 * 1000;

export interface GeolocationData {
  country: string;
  countryName: string;
  cached: boolean;
  fetchedAt: number;
}

export const getCountryFromGeolocation = async (): Promise<GeolocationData | null> => {
  if (typeof window === 'undefined') return null;

  try {
    // Check cache first
    const cached = getCachedGeolocation();
    if (cached && !isGeolocationExpired(cached)) {
      return { ...cached, cached: true };
    }

    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Geolocation fetch failed');

    const data = await response.json();
    const geolocation: GeolocationData = {
      country: data.country_code || 'US',
      countryName: data.country_name || 'United States',
      cached: false,
      fetchedAt: Date.now(),
    };

    try {
      localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(geolocation));
    } catch (e) {
      console.warn('Failed to cache geolocation');
    }

    return geolocation;
  } catch (error) {
    console.error('[Geolocation] Error:', error);
    return getCachedGeolocation() || null;
  }
};

const getCachedGeolocation = (): GeolocationData | null => {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(GEOLOCATION_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const isGeolocationExpired = (geo: GeolocationData): boolean => {
  return Date.now() - geo.fetchedAt > GEOLOCATION_CACHE_TTL;
};

export const clearGeolocationCache = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(GEOLOCATION_CACHE_KEY);
  } catch (e) {
    console.warn('Failed to clear geolocation cache');
  }
};
