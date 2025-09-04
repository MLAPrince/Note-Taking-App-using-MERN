

export function formatNoteTimestamp(createdAt, updatedAt) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = updatedAt ? new Date(updatedAt) : null;

  // --- Formatted Base Date & Time ---
  // Using toLocaleDateString and toLocaleTimeString with "en-US" for consistent output
  // Date format: May 14, 2025
  const baseFormattedDate = (dateObj) => dateObj.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Time format: 1:30 PM
  const baseFormattedTime = (dateObj) => dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // --- Determine which timestamp to display ---
  let displayDate = baseFormattedDate(createdAtDate);
  let displayTime = baseFormattedTime(createdAtDate);

  // If updatedAtDate exists and is genuinely different from createdAtDate
  if (updatedAtDate && updatedAtDate.getTime() !== createdAtDate.getTime()) {
    displayDate = baseFormattedDate(updatedAtDate);
    displayTime = baseFormattedTime(updatedAtDate);
  }

  // Return the formatted string
  return `${displayDate} | ${displayTime}`;
}