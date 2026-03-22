import type { APIRoute } from 'astro';

export const prerender = false;

const ISBN_OVERRIDES: Record<string, string> = {
  '9780590353427': '9780747532699',
  '9780439064873': '9780747538486',
  '9780545010221': '9780747591054',
  '9780618346264': '9780261102361',
  '9780618346271': '9780261102378',
};

export const GET: APIRoute = async ({ params }) => {
  const isbn = params.isbn?.replace(/[^0-9X]/gi, '');
  if (!isbn) return new Response('Not found', { status: 404 });

  const resolvedIsbn = ISBN_OVERRIDES[isbn] ?? isbn;

  const sources = [
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
      if (buf.byteLength < 25000) continue;

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