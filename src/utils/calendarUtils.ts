/**
 * Utility functions for calendar booking
 */

/**
 * Opens the Calendly booking page in a new tab
 * Uses the Payfud intro meeting link: https://calendly.com/payfud/intro
 */
export const openCalendarBooking = (): void => {
  window.open('https://calendly.com/payfud/intro', '_blank', 'noopener,noreferrer');
};
