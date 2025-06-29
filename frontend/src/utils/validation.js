export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const isValidSensorData = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (!data.value || !data.timestamp) return false;
  if (typeof data.value !== 'number') return false;
  return true;
};

export const validators = {
  email: (value) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }),

  password: (value) => {
    const minLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      message: 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character'
    };
  },

  phone: (value) => ({
    isValid: /^\+?[1-9]\d{1,14}$/.test(value),
    message: 'Please enter a valid phone number'
  }),

  verificationCode: (value) => ({
    isValid: /^\d{6}$/.test(value),
    message: 'Please enter a valid 6-digit verification code'
  }),

  temperature: (value) => ({
    isValid: !isNaN(value) && value >= -50 && value <= 100,
    message: 'Temperature must be between -50°C and 100°C'
  }),

  humidity: (value) => ({
    isValid: !isNaN(value) && value >= 0 && value <= 100,
    message: 'Humidity must be between 0% and 100%'
  })
}; 