/**
 * Look for a cookie by name
 *
 * @param {string} name
 * @returns {string}
 */
export function getCookie(name) {
  const cookieName = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }

  return '';
}

/**
 * Delete a cookie by name
 *
 * @param {string} name
 */
export function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

/**
 * Set a cookie
 *
 * @param {string} name
 * @param {string} value
 * @param {Date} expirationDate
 */
export function setCookie(name, value, expirationDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))) {
  const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; secure;`;

  document.cookie = cookie;
}
