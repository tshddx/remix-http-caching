### This should 200 with an etag response header and take around 1500ms:

```
time curl -v 'http://localhost:3000/' \
  -H 'Cache-Control: max-age=0' \
  -H 'Accept: text/html'
```

### This should 304 and take only a few milliseconds (definitely not 500ms):

```
time curl -v 'http://localhost:3000/' \
  -H 'Cache-Control: max-age=0' \
  -H 'Accept: text/html' \
  -H 'If-None-Match: W/"appVersion:1.0,documentVersion:1.0"'
```
