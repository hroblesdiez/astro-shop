import { storeApi } from './store-api';
import { getCountryFromGeolocation } from './geolocation';

const BILLING_COUNTRY_KEY = 'woo_billing_country';

export const updateCartByCountry = async (countryCode: string): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    console.log(`[CountrySync] Updating cart for country: ${countryCode}`);
    
    // Save country preference
    localStorage.setItem(BILLING_COUNTRY_KEY, countryCode);

    // Update customer billing address with the country
    // WooCommerce recalculates taxes automatically based on billing_address.country
    await storeApi.updateCustomer({
      billing_address: {
        country: countryCode,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_1: '',
        city: '',
        postcode: '',
      },
    });

    console.log(`[CountrySync] Cart updated with country: ${countryCode}`);
  } catch (error) {
    console.error('[CountrySync] Error updating cart:', error);
    throw error;
  }
};

export const getStoredBillingCountry = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(BILLING_COUNTRY_KEY);
};

export const setSilentCountry = (countryCode: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BILLING_COUNTRY_KEY, countryCode);
};

export const initializeCountryFromGeolocation = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;

  try {
    // Check if user already has a country preference
    const storedCountry = getStoredBillingCountry();
    if (storedCountry) {
      console.log(`[CountryInit] Using stored country: ${storedCountry}`);
      return storedCountry;
    }

    // Fetch geolocation
    const geolocation = await getCountryFromGeolocation();
    if (!geolocation) {
      console.warn('[CountryInit] Geolocation failed, defaulting to PL');
      setSilentCountry('PL');
      return 'PL';
    }

    const countryCode = geolocation.country;
    console.log(`[CountryInit] Detected country: ${countryCode}`);
    setSilentCountry(countryCode);

    // Silently update cart in background
    updateCartByCountry(countryCode).catch((err) => {
      console.warn('[CountryInit] Background cart update failed:', err);
    });

    return countryCode;
  } catch (error) {
    console.error('[CountryInit] Error:', error);
    setSilentCountry('PL');
    return 'PL';
  }
};
