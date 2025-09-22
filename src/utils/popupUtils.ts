const POPUP_DISMISSED_KEY = 'localspot-popup-dismissed'

export const isPopupDismissed = (): boolean => {
  try {
    return localStorage.getItem(POPUP_DISMISSED_KEY) === 'true'
  } catch {
    // Handle localStorage errors gracefully (e.g., in incognito mode)
    return false
  }
}

export const dismissPopup = (): void => {
  try {
    localStorage.setItem(POPUP_DISMISSED_KEY, 'true')
  } catch {
    // Handle localStorage errors gracefully
  }
}

export const resetPopupDismissal = (): void => {
  try {
    localStorage.removeItem(POPUP_DISMISSED_KEY)
  } catch {
    // Handle localStorage errors gracefully
  }
}
