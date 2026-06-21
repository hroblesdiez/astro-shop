import { countryRequiresState, getStatesForCountry } from './country-states';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POLISH_POSTCODE_REGEX = /^\d{2}-\d{3}$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePostcode = (postcode: string, country: string): boolean => {
  if (country === 'PL') {
    return POLISH_POSTCODE_REGEX.test(postcode);
  }
  return postcode.length >= 3;
};

const validateState = (state: string, country: string): boolean => {
  if (!countryRequiresState(country)) return true;
  if (!state?.trim()) return false;
  return getStatesForCountry(country).some(s => s.code === state);
};

export const validateBillingAddress = (billing: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  state?: string;
  address1: string;
  city: string;
  postcode: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!billing.firstName?.trim()) {
    errors.push({ field: 'billing.firstName', message: 'First name is required' });
  }

  if (!billing.lastName?.trim()) {
    errors.push({ field: 'billing.lastName', message: 'Last name is required' });
  }

  if (!billing.email?.trim()) {
    errors.push({ field: 'billing.email', message: 'Email is required' });
  } else if (!validateEmail(billing.email)) {
    errors.push({ field: 'billing.email', message: 'Invalid email format' });
  }

  if (!billing.country?.trim()) {
    errors.push({ field: 'billing.country', message: 'Country is required' });
  }

  if (!validateState(billing.state || '', billing.country)) {
    errors.push({ field: 'billing.state', message: 'Province/State is required' });
  }

  if (!billing.address1?.trim()) {
    errors.push({ field: 'billing.address1', message: 'Address is required' });
  }

  if (!billing.city?.trim()) {
    errors.push({ field: 'billing.city', message: 'City is required' });
  }

  if (!billing.postcode?.trim()) {
    errors.push({ field: 'billing.postcode', message: 'Postal code is required' });
  } else if (!validatePostcode(billing.postcode, billing.country)) {
    errors.push({
      field: 'billing.postcode',
      message: 'Invalid postal code format',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateShippingAddress = (shipping: {
  firstName: string;
  lastName: string;
  country: string;
  state?: string;
  address1: string;
  city: string;
  postcode: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!shipping.firstName?.trim()) {
    errors.push({ field: 'shipping.firstName', message: 'First name is required' });
  }

  if (!shipping.lastName?.trim()) {
    errors.push({ field: 'shipping.lastName', message: 'Last name is required' });
  }

  if (!shipping.country?.trim()) {
    errors.push({ field: 'shipping.country', message: 'Country is required' });
  }

  if (!validateState(shipping.state || '', shipping.country)) {
    errors.push({ field: 'shipping.state', message: 'Province/State is required' });
  }

  if (!shipping.address1?.trim()) {
    errors.push({ field: 'shipping.address1', message: 'Address is required' });
  }

  if (!shipping.city?.trim()) {
    errors.push({ field: 'shipping.city', message: 'City is required' });
  }

  if (!shipping.postcode?.trim()) {
    errors.push({ field: 'shipping.postcode', message: 'Postal code is required' });
  } else if (!validatePostcode(shipping.postcode, shipping.country)) {
    errors.push({
      field: 'shipping.postcode',
      message: 'Invalid postal code format',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
