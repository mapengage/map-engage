export function formatDateRange(startDate, endDate) {
  // Helper function to format hours and minutes
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert to 12-hour format and handle midnight
    return `${hours}:${minutes} ${ampm}`;
  };

  // Format the date (month/day)
  const month = startDate.getMonth() + 1; // getMonth() is zero-based
  const day = startDate.getDate();

  // Format the time ranges
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  // Combine to the desired format
  return `${month}/${day} ${startTime} to ${endTime}`;
}
