import { onLCP, onINP, onCLS } from 'web-vitals';

function report(metric: any) {
  console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (rating: ${metric.rating})`);

  const endpoint = import.meta.env.PUBLIC_ANALYTICS_ENDPOINT;
  if (endpoint) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    });
    navigator.sendBeacon?.(endpoint, body);
  }
}

onLCP(report);
onINP(report);
onCLS(report);
