# aptly-web-ui
Simple web UI for aptly

## Usage

Currently really raw. The install method I use is to decompress the dist [archive](https://github.com/sdumetz/aptly-web-ui/blob/gh-pages/aptly-web-ui.tar.gz) in aptly root folder (default to ~/.aptly/public). It should look like this :

    ~/.aptly/public
      - dists
      - pool
      - ui

My nginx config to serve apt repo + interface :
```
server {
  listen   80;
  root /var/aptly/.aptly/public;
  index index.html index.htm;

  access_log /var/log/nginx/packages.access.log  log_access;
  error_log /var/log/nginx/packages.error.log error;

  server_name my-domain.net;
  autoindex off;
  location / {
    try_files $uri $uri/;

    allow 192.168.1.0/24;
    deny all;
  }
  location /ui/ {
    try_files $uri $uri/ /ui/index.html;
    autoindex off;
  }
  location /dist/ {
    autoindex on;
  }
  location /pool/ {
    autoindex on;
  }
  location /api/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;
    proxy_pass http://127.0.0.1:8080;
  }

}
```

Activate it and navigate to `your-domain.net/ui/`.

## Security

This solution is compatible with external auth methods like [oauth_proxy](https://github.com/bitly/oauth2_proxy).

## Contribute

Currently very few routes are implemented. This is developped using React and React-router.
