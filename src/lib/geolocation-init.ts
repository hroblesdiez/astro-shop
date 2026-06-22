export const initGlobalGeolocation = async () => {
  if (typeof window === 'undefined') return;

  try {
    const { initializeCountryFromGeolocation } = await import('../lib/country-sync');
    await initializeCountryFromGeolocation();
  } catch (error) {
    console.warn('[GlobalGeolocation] Failed to initialize:', error);
  }
};

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalGeolocation);
} else {
  initGlobalGeolocation();
}
