import type { Certificate } from '../types';

/**
 * Certificate archive.
 *
 * 1. Copy each original file (PNG, JPG, WebP or PDF) into /public/certificates
 * 2. Add one entry below. `file` is the path inside /public.
 *
 * Only fill in `issuer`, `date`, `credentialId` and `verifyUrl` when they appear on the
 * original certificate or the issuer's official verification page. Anything left out
 * simply isn't shown.
 *
 * For PDFs you can optionally add a `preview` image (a screenshot of page one) so the
 * gallery card shows the real document instead of a PDF tile.
 *
 * Example:
 *
 * {
 *   id: 'python-basics',
 *   title: 'Python Basics',
 *   issuer: 'Issuing Organisation',
 *   date: 'March 2025',
 *   category: 'Course',
 *   file: '/certificates/python-basics.pdf',
 *   preview: '/certificates/python-basics.png',
 *   credentialId: 'ABC-123',
 *   verifyUrl: 'https://issuer.example.com/verify/ABC-123',
 * },
 */
export const certificates: Certificate[] = [];
