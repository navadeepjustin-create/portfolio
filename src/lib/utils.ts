export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** True when a link/URL has actually been filled in. */
export function isSet(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Make an email value usable in an href whether or not it already has "mailto:". */
export function toMailto(email: string, params?: Record<string, string>): string {
  const clean = email.trim().replace(/^mailto:/i, '');
  const query = params
    ? '?' +
      Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')
    : '';
  return `mailto:${clean}${query}`;
}

export function isPdf(path: string): boolean {
  return /\.pdf($|[?#])/i.test(path);
}
