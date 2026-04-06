import type { APIRoute } from 'astro';

export const prerender = false;

const ALLOWED_ISBNS = new Set([
  '9781492040347', '9781449373320', '9798664653403', '9781736049112',
  '9780451524935', '9780060850524', '9780140449136', '9780441013593',
  '9780062315007', '9780618346257', '9780590353427', '9780439064873',
  '9780439136358', '9780439139595', '9780439358071', '9780439784542',
  '9780545010221', '9780547928227', '9780618346271', '9780618346264',
  '9780140449334', '9780140455113', '9780679724650', '9780679733737',
]);

const ISBN_OVERRIDES: Record<string, string> = {
  '9780590353427': '9780747532699',
  '9780439064873': '9780747538486',
  '9780545010221': '9780747591054',
  '9780618346264': '9780261102361',
  '9780618346271': '9780261102378',
  '9780679724650': '9780140449235',
};

export const GET: APIRoute = async ({ params, request }) => {
  const referer = request.headers.get('referer');
  if (referer && !referer.includes('martinchernyavskiy.com') && !referer.includes('localhost')) {
    return new Response('Forbidden', { status: 403 });
  }

  const isbn = params.isbn?.replace(/[^0-9X]/gi, '');
  if (!isbn) return new Response('Not found', { status: 404 });

  if (!ALLOWED_ISBNS.has(isbn)) {
    return new Response('Forbidden', { status: 403 });
  }

  const resolvedIsbn = ISBN_OVERRIDES[isbn] ?? isbn;

  // BGE's OpenLibrary entry is an interior page scan rather than the cover,
  // so for that specific ISBN we try Google Books first.
  // All other books stay with OpenLibrary first (Google Books returns gray
  // placeholder images for some editions it doesn't have good scans for).
  const googleFirst = isbn === '9780679724650';

  const sources = googleFirst
    ? [
        `https://books.google.com/books/content?vid=ISBN${resolvedIsbn}&printsec=frontcover&img=1&zoom=3&source=gbs_api`,
        `https://covers.openlibrary.org/b/isbn/${resolvedIsbn}-L.jpg`,
        `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
        `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=3&source=gbs_api`,
        `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
      ]
    : [
        `https://covers.openlibrary.org/b/isbn/${resolvedIsbn}-L.jpg`,
        `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
        `https://books.google.com/books/content?vid=ISBN${resolvedIsbn}&printsec=frontcover&img=1&zoom=3&source=gbs_api`,
        `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=3&source=gbs_api`,
        `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
      ];

  for (const url of sources) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BookshelfBot/1.0)' },
      });
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) continue;

      const buf = await res.arrayBuffer();
      if (buf.byteLength < 20000) continue;

      return new Response(buf, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      continue;
    }
  }

  return new Response('Not found', { status: 404 });
};