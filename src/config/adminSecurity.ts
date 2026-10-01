/**
 * Sandhya Enterprises - Executive Security & Admin Master Key Configuration
 * 
 * Default custom key can be edited directly here or updated dynamically
 * by the proprietor/admin inside the Admin Command Center -> Security tab.
 */

// Initial default custom key (replacing previous ADMIN2026 / 9500)
export const DEFAULT_CUSTOM_ADMIN_KEY = 'Sandhya@Admin2026';

export const ADMIN_KEY_STORAGE_KEY = 'sandhya_custom_admin_master_key';

/**
 * Retrieve the active administrative master key / passcode.
 * Checks localStorage first, then environment variable, then fallback default.
 */
export function getAdminMasterKey(): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = window.localStorage.getItem(ADMIN_KEY_STORAGE_KEY);
      if (savedKey && savedKey.trim()) {
        return savedKey.trim();
      }
    }
  } catch (err) {
    console.warn('[AdminSecurity] Could not access localStorage:', err);
  }

  // Vite environment variable support
  const envKey = (import.meta.env?.VITE_ADMIN_MASTER_KEY as string | undefined)?.trim();
  if (envKey) {
    return envKey;
  }

  return DEFAULT_CUSTOM_ADMIN_KEY;
}

/**
 * Save a new custom administrative master key / passcode.
 */
export function setCustomAdminKey(newKey: string): { success: boolean; message: string } {
  const clean = newKey.trim();
  if (!clean || clean.length < 4) {
    return {
      success: false,
      message: 'Admin Master Key must be at least 4 characters long.'
    };
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(ADMIN_KEY_STORAGE_KEY, clean);
      return {
        success: true,
        message: 'New Admin Master Key has been securely saved and activated.'
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'Failed to save to local storage: ' + (err as Error).message
    };
  }

  return {
    success: false,
    message: 'Local storage not available to persist key.'
  };
}

/**
 * Verify whether the candidate key matches the active admin master key.
 */
export function verifyAdminMasterKey(candidateKey: string): boolean {
  if (!candidateKey) return false;
  const clean = candidateKey.trim();
  if (!clean) return false;

  const currentKey = getAdminMasterKey();
  return clean === currentKey;
}

/**
 * Reset back to initial default custom key
 */
export function resetAdminMasterKey(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(ADMIN_KEY_STORAGE_KEY);
    }
  } catch {}
}

/**
 * Check if a custom key has been set in localStorage
 */
export function hasCustomAdminKeySet(): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = window.localStorage.getItem(ADMIN_KEY_STORAGE_KEY);
      return Boolean(savedKey && savedKey.trim());
    }
  } catch {}
  return false;
}
