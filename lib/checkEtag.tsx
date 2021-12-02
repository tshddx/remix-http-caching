export default function checkEtag(
  currentEtag: string | null,
  request: Request
) {
  // If the browser already has an etag for this request, it will send it in the
  // If-None-Match header of the request.
  const ifNoneMatch = request.headers.get('If-None-Match');
  // If the browser already has a response cached with the same etag, then we do
  // *not* need to continue and perform any slow computation. We can throw an
  // empty Response body with the 304 Not Modified status code, and the browser
  // will display its cached version instantly.
  if (currentEtag && ifNoneMatch && currentEtag === ifNoneMatch) {
    return new Response('', {
      status: 304,
      headers: { etag: currentEtag },
    });
  } else {
    return null;
  }
}
