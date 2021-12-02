import type { LoaderFunction } from 'remix';
import { useLoaderData, json, HeadersFunction } from 'remix';
import sleep from '../../lib/sleep';

export let loader: LoaderFunction = async ({ request }) => {
  // Generate an etag for the page. Often this can be done without doing all of
  // the slow computation that we will do later in this loader function. In
  // this example, we will pretend the we have an appVersion and documentVersion
  // that we can combine to generate a unique etag.
  const etag = `W/"appVersion:1.0,documentVersion:1.0"`;

  // If the browser already has an etag for this request, it will send it in the
  // If-None-Match header.
  const ifNoneMatch = request.headers.get('If-None-Match');
  // If the browser already has this document cached with the same etag, then we
  // do not need to continue and perform the slow computation. We can return an
  // empty Response body with the 304 Not Modified response code, and the
  // browser will display its cached version instantly.
  if (etag === ifNoneMatch) {
    return new Response('', {
      status: 304,
      headers: { etag },
    });
  }

  // Pretend we are performing some slow computation.
  await sleep(1000);

  const data = {
    message: `This page does some slow stuff in the loader function, so when there is a cache miss the page will take about 1 second to load. But when there is a cache hit, the page should load very quickly because it does not need to do that slow stuff!`,
  };
  return json(data, { headers: { etag } });
};

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export default function Index() {
  let data = useLoaderData();

  // Spin on the main thread until we're done sleeping, to simulate a very
  // slow React render.
  const startDate = Date.now();
  while (Date.now() < startDate + 500) {
    //
  }

  return (
    <main>
      <h1>Remix HTTP Caching</h1>
      <p>{data.message}</p>
    </main>
  );
}
