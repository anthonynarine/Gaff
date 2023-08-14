/**
 * Formats a date into 'MM/DD/YYYY' format.
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} - Formatted date in the format 'MM/DD/YYYY'.
 */
function formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

/**
 * Formats a date into 'HH:MM AM/PM' format.
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} - Formatted time in the format 'HH:MM AM/PM'.
 */
function formatTime(date: Date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

/**
 * Formats a timestamp into a readable date and time string.
 *
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} - Formatted date and time in the format 'MM/DD/YYYY at HH:MM AM/PM'.
 */
export function FormatTimeStamp(timestamp: string): string {
    // Convert the timestamp into a Date object
    const date = new Date(Date.parse(timestamp));

    // Get the formatted date and time
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(date);

    // Return the combined formatted date and time
    return `${formattedDate} at ${formattedTime}`;
}
