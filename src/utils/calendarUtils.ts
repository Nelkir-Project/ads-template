/**
 * Utility functions for calendar booking
 */

/**
 * Opens the Calendly booking page in a new tab
 * Uses the LocalSpot demo link: https://calendly.com/hello-localspot/demo
 */
export const openCalendarBooking = (): void => {
  window.open('https://calendly.com/hello-localspot/demo', '_blank', 'noopener,noreferrer');
};
