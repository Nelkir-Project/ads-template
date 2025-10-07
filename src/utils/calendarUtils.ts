/**
 * Utility functions for calendar booking
 */

/**
 * Opens the Calendly booking page in a new tab
 * Uses the LocalSpot demo link: https://calendly.com/hello-localspot/demo
 * Redirects to confirmation page after booking
 */
export const openCalendarBooking = (): void => {
  const confirmationUrl = `${window.location.origin}/confirmation`;
  const calendlyUrl = `https://calendly.com/hello-localspot/demo?redirect_url=${encodeURIComponent(confirmationUrl)}`;
  window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
};
