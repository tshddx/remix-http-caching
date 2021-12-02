### This should 200 with an etag response header:

```
curl -v 'http://localhost:3000/' \
  -H 'Cache-Control: max-age=0' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
```

### This should 304:

```
curl -v 'http://localhost:3000/' \
  -H 'Cache-Control: max-age=0' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'If-None-Match: W/"appVersion:1.0,documentVersion:1.0"'
```
