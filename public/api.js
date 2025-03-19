// public/api.js
window.fetchAPI = async (date) => {
    console.log('Mock fetchAPI called with date:', date);
    // Mock response: return different times based on the date
    const day = date.getDate();
    if (day % 2 === 0) {
      return ['17:00', '18:00', '19:00']; // Even days
    } else {
      return ['20:00', '21:00', '22:00']; // Odd days
    }
  };
  
  window.submitAPI = async (formData) => {
    console.log('Mock submitAPI called with formData:', formData);
    return true;
  };